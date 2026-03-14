'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Stars } from '@/components/Stars'
import { ThemeToggle } from '@/components/ThemeToggle'
import { supabase } from '@/lib/supabase'
import { haversineDistance, deliveryHours } from '@/lib/utils'
import type { Stamp, User } from '@/types'

export default function ComposePage() {
  return (
    <Suspense fallback={<><Stars /><div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'var(--tx3)', fontSize: 14 }}>loading...</div></>}>
      <ComposeInner />
    </Suspense>
  )
}

function ComposeInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [toQuery, setToQuery] = useState('')
  const [toUser, setToUser] = useState<User | null>(null)
  const [searchResults, setSearchResults] = useState<User[]>([])
  const [body, setBody] = useState('')
  const [stamps, setStamps] = useState<Stamp[]>([])
  const [stampId, setStampId] = useState<number | null>(null)
  const [song, setSong] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isBottle, setIsBottle] = useState(false)
  const [memoryRecipient, setMemoryRecipient] = useState('')

  useEffect(() => {
    loadInitial()
  }, [])

  async function loadInitial() {
    const { data: { user: authUser } } = await supabase.auth.getUser()
    if (!authUser) { router.push('/login'); return }

    const { data: profile } = await supabase.from('users').select('*').eq('id', authUser.id).single()
    if (profile) setCurrentUser(profile)

    // load user's stamps
    const { data: userStamps } = await supabase
      .from('user_stamps')
      .select('stamp_id, stamps(*)')
      .eq('user_id', authUser.id)

    if (userStamps && userStamps.length > 0) {
      const s = userStamps.map((us: any) => us.stamps).filter(Boolean)
      setStamps(s)
      if (s.length > 0) setStampId(s[0].id)
    } else {
      // fallback: load free stamps
      const { data: freeStamps } = await supabase.from('stamps').select('*').eq('xp_required', 0).eq('is_premium', false)
      if (freeStamps) {
        setStamps(freeStamps)
        if (freeStamps.length > 0) setStampId(freeStamps[0].id)
      }
    }

    // check if coming from bottle or specific user
    const bottle = searchParams.get('bottle')
    const userId = searchParams.get('to')
    if (bottle === 'true') setIsBottle(true)
    if (userId) {
      const { data: recipient } = await supabase.from('users').select('*').eq('id', userId).single()
      if (recipient) { setToUser(recipient); setToQuery(recipient.display_name || '') }
    }
  }

  async function searchUsers(query: string) {
    setToQuery(query)
    setToUser(null)
    if (query.length < 2) { setSearchResults([]); return }

    const { data } = await supabase
      .from('users')
      .select('*')
      .ilike('display_name', `%${query}%`)
      .neq('id', currentUser?.id || '')
      .limit(5)

    if (data) setSearchResults(data)
  }

  function selectUser(u: User) {
    setToUser(u)
    setToQuery(u.display_name || '')
    setSearchResults([])
  }

  async function sendLetter() {
    setError('')
    if (!isBottle && !toUser) { setError('select a recipient'); return }
    if (body.trim().length < 10) { setError('write at least 10 characters'); return }
    if (!stampId) { setError('select a stamp'); return }
    if (!currentUser) return

    setSending(true)

    let recipientId = toUser?.id || null
    let distanceKm: number | null = null
    let hours: number | null = null
    let deliversAt: string | null = null

    // for bottle mail, find a random user
    if (isBottle) {
      const { data: randomUsers } = await supabase
        .from('users')
        .select('*')
        .neq('id', currentUser.id)
        .eq('onboarding_complete', true)
        .limit(10)

      if (randomUsers && randomUsers.length > 0) {
        const rand = randomUsers[Math.floor(Math.random() * randomUsers.length)]
        recipientId = rand.id
        toUser && setToUser(null) // don't reveal who
        if (currentUser.latitude && currentUser.longitude && rand.latitude && rand.longitude) {
          distanceKm = haversineDistance(currentUser.latitude, currentUser.longitude, rand.latitude, rand.longitude)
        }
      }
    }

    // calculate distance
    if (!distanceKm && currentUser.latitude && currentUser.longitude && toUser?.latitude && toUser?.longitude) {
      distanceKm = haversineDistance(currentUser.latitude, currentUser.longitude, toUser.latitude, toUser.longitude)
    }

    if (!distanceKm) distanceKm = 500 // default if no coords

    hours = deliveryHours(distanceKm)
    const now = new Date()
    deliversAt = new Date(now.getTime() + hours * 60 * 60 * 1000).toISOString()

    const { error: insertError } = await supabase.from('letters').insert({
      sender_id: currentUser.id,
      recipient_id: recipientId,
      content: body,
      stamp_id: stampId,
      song_url: song || null,
      status: 'IN_TRANSIT',
      is_bottle: isBottle,
      is_memory_box: false,
      distance_km: Math.round(distanceKm),
      delivery_hours: Math.round(hours * 10) / 10,
      sent_at: now.toISOString(),
      delivers_at: deliversAt,
    })

    if (insertError) {
      setError(insertError.message)
      setSending(false)
      return
    }

    // award XP
    let xpGain = body.length >= 500 ? 25 : body.length >= 200 ? 10 : 5
    if (isBottle) xpGain += 10
    await supabase.from('users').update({ xp: currentUser.xp + xpGain }).eq('id', currentUser.id)

    setSending(false)
    setSuccess(`letter sent! it will travel ${Math.round(distanceKm).toLocaleString()} km and arrive in ~${hours < 1 ? '30 min' : hours < 24 ? Math.round(hours) + 'h' : Math.round(hours / 24) + ' days'}.`)
    setTimeout(() => router.push('/dashboard'), 3000)
  }

  async function saveToMemoryBox() {
    setError('')
    if (body.trim().length < 10) { setError('write at least 10 characters'); return }
    if (!currentUser) return

    setSending(true)

    const { error: insertError } = await supabase.from('letters').insert({
      sender_id: currentUser.id,
      recipient_id: null,
      content: body,
      stamp_id: stampId,
      song_url: song || null,
      status: 'MEMORY_BOX',
      is_bottle: false,
      is_memory_box: true,
      memory_box_recipient: memoryRecipient || null,
      distance_km: null,
      delivery_hours: null,
      sent_at: new Date().toISOString(),
      delivers_at: null,
    })

    if (insertError) {
      setError(insertError.message)
      setSending(false)
      return
    }

    // award XP
    await supabase.from('users').update({ xp: currentUser.xp + 5 }).eq('id', currentUser.id)

    setSending(false)
    setSuccess('saved to memory box.')
    setTimeout(() => router.push('/memory'), 2000)
  }

  return (
    <>
      <Stars />
      <nav className="topnav">
        <span className="nav-brand">forget-me-not<span>_ letters that last</span></span>
        <div className="nav-right">
          <a href="/dashboard" className="nav-link">inbox</a>
          <ThemeToggle />
        </div>
      </nav>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '80px 24px 60px', position: 'relative', zIndex: 1 }}>
        <a href="/dashboard" style={{ fontSize: 12, color: 'var(--tx3)', marginBottom: 20, display: 'block' }}>&larr; back to inbox</a>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--lilac)', marginBottom: 4 }}>
          {isBottle ? 'throw a bottle' : 'write a letter'}<span className="cursor"></span>
        </h2>
        <p className="prompt" style={{ fontSize: 13, marginBottom: 32 }}>
          {isBottle ? 'write to a stranger. the ocean will find them.' : 'take your time. every word carries weight.'}
        </p>

        {!isBottle && (
          <div style={{ marginBottom: 20, position: 'relative' }}>
            <div className="form-label">to</div>
            <input className="ev-input" value={toQuery} onChange={e => searchUsers(e.target.value)} placeholder="search for a pen pal..." />
            {searchResults.length > 0 && (
              <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'var(--bg2)', border: '1px solid var(--brd)', borderRadius: 8, zIndex: 10, maxHeight: 200, overflow: 'auto' }}>
                {searchResults.map(u => (
                  <button key={u.id} onClick={() => selectUser(u)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 14px', background: 'none', border: 'none', color: 'var(--txt)', cursor: 'pointer', fontSize: 13, borderBottom: '1px solid var(--brd)' }}>
                    @{u.display_name} <span style={{ color: 'var(--tx4)', fontSize: 11 }}>— {u.country}</span>
                  </button>
                ))}
              </div>
            )}
            {toUser && (
              <div style={{ fontSize: 11, color: 'var(--lilac)', marginTop: 4 }}>
                writing to @{toUser.display_name} in {toUser.country}
              </div>
            )}
          </div>
        )}

        <div style={{ marginBottom: 20 }}>
          <div className="form-label">your letter</div>
          <textarea
            className="ev-input"
            value={body}
            onChange={e => setBody(e.target.value)}
            placeholder="dear..."
            rows={10}
            style={{ resize: 'vertical', lineHeight: 1.9 }}
          />
          <div style={{ fontSize: 11, color: 'var(--tx4)', marginTop: 6, textAlign: 'right' }}>
            {body.length} characters {body.length < 50 && body.length > 0 && '· min 50 for full xp'}
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div className="form-label">choose a stamp</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {stamps.map(s => (
              <button
                key={s.id}
                onClick={() => setStampId(s.id)}
                className="avatar"
                style={{
                  width: 48, height: 48, fontSize: 22, cursor: 'pointer',
                  borderColor: stampId === s.id ? 'var(--lilac)' : 'var(--brd)',
                  background: stampId === s.id ? 'var(--acf)' : 'var(--bg2)',
                }}
                title={s.name}
              >
                {s.emoji}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 32 }}>
          <div className="form-label">attach a song (optional)</div>
          <input className="ev-input" value={song} onChange={e => setSong(e.target.value)} placeholder="spotify or apple music link..." />
        </div>

        {error && (
          <p style={{ color: 'var(--pink)', fontSize: 12, marginBottom: 14 }}>{'> '}{error}</p>
        )}
        {success && (
          <p style={{ color: 'var(--lilac)', fontSize: 13, marginBottom: 14, lineHeight: 1.6 }}>{success}</p>
        )}

        {!success && (
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn" style={{ flex: 1 }} onClick={sendLetter} disabled={sending}>
              {sending ? 'sending...' : isBottle ? 'throw into the ocean' : 'send letter'}
            </button>
            {!isBottle && (
              <button className="btn-ghost" onClick={saveToMemoryBox} disabled={sending}>save to memory box</button>
            )}
          </div>
        )}
      </div>
    </>
  )
}
