'use client'

import { Stars } from '@/components/Stars'
import { ThemeToggle } from '@/components/ThemeToggle'

const LETTER = {
  id: 3,
  from: 'iris',
  avatar: '🦋',
  city: 'paris, france',
  stamp: '🌸',
  time: 'just now',
  distance: '2,200 km',
  route: 'paris → istanbul',
  mood: 'var(--pink)',
  song: { title: 'skinny love', artist: 'bon iver' },
  body: `chère luna,

i found your profile and thought — here is someone who understands that the best conversations happen in the spaces between words.

i've been collecting sunsets from my window in montmartre. not photographing them, just watching. there's something about letting beautiful things exist without capturing them, don't you think?

your profile said you love kafka. i've been reading his diaries lately — not the famous letters, but the quiet entries where he talks about walking through prague at night. he writes about loneliness the way some people write about love.

i think we might understand the same silences.

with curiosity,
iris 🦋`,
}

export default function LetterViewPage() {
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
        <a href="/dashboard" style={{ fontSize: 12, color: 'var(--tx3)', marginBottom: 24, display: 'block' }}>&larr; back to inbox</a>

        <div className="card" style={{ borderTop: `3px solid ${LETTER.mood}`, padding: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div className="avatar" style={{ width: 44, height: 44, fontSize: 20 }}>{LETTER.avatar}</div>
              <div>
                <div style={{ fontSize: 14, color: 'var(--lilac)', fontWeight: 700 }}>@{LETTER.from}</div>
                <div style={{ fontSize: 12, color: 'var(--tx4)' }}>{LETTER.city}</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 22 }}>{LETTER.stamp}</div>
              <div style={{ fontSize: 11, color: 'var(--tx4)' }}>{LETTER.time}</div>
            </div>
          </div>

          <div style={{
            fontSize: 14, color: 'var(--tx2)', lineHeight: 2,
            whiteSpace: 'pre-line', marginBottom: 24,
          }}>
            {LETTER.body}
          </div>

          {LETTER.song && (
            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 0 }}>
              <div className="music-wave"><span /><span /><span /><span /><span /></div>
              <div>
                <div style={{ fontSize: 13, color: 'var(--txt)' }}>{LETTER.song.title}</div>
                <div style={{ fontSize: 11, color: 'var(--tx4)' }}>{LETTER.song.artist}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
          <a href="/compose" className="btn" style={{ flex: 1, textAlign: 'center' }}>write back</a>
          <button className="btn-ghost">save</button>
        </div>

        <div style={{ fontSize: 11, color: 'var(--tx4)', textAlign: 'center', marginTop: 16 }}>
          {LETTER.route} · {LETTER.distance}
        </div>
      </div>
    </>
  )
}
