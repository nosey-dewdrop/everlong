'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Stars } from '@/components/Stars'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false) }
    else { router.push('/dashboard') }
  }

  return (
    <>
      <Stars />
      <div style={{ maxWidth: 380, margin: '0 auto', padding: '16vh 24px', position: 'relative', zIndex: 1 }}>
        <h2 className="ar ar1" style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--lilac)', marginBottom: 4 }}>
          welcome back<span className="cursor"></span>
        </h2>
        <p className="prompt ar ar2" style={{ fontSize: 12, marginBottom: 28 }}>your letters have been waiting.</p>

        <div className="ar ar3" style={{ marginBottom: 14 }}>
          <div className="form-label">email</div>
          <input className="ev-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@world.com" />
        </div>
        <div className="ar ar3" style={{ marginBottom: 20 }}>
          <div className="form-label">password</div>
          <input className="ev-input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••" />
        </div>

        {error && (
          <p className="ar" style={{ color: 'var(--pink)', fontSize: 12, marginBottom: 14 }}>
            {'> '}{error}
          </p>
        )}

        <button className="btn btn-full ar ar4" onClick={handleLogin} disabled={loading} style={{ opacity: loading ? 0.6 : 1 }}>
          {loading ? 'connecting...' : 'sign in'}
        </button>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 11, color: 'var(--tx4)' }}>
          no account? <a href="/register">create one</a>
        </p>
      </div>
    </>
  )
}
