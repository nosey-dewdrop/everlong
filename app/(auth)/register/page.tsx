'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Stars } from '@/components/Stars'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function RegisterPage() {
  const router = useRouter()
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  function handleRegister() {
    setError('')
    if (!displayName.trim()) { setError('display name is required'); return }
    if (!email.trim()) { setError('email is required'); return }
    if (password.length < 6) { setError('min 6 characters'); return }
    if (password !== confirmPassword) { setError('passwords don\'t match'); return }
    router.push('/onboarding')
  }

  return (
    <>
      <Stars />
      <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 10 }}><ThemeToggle /></div>
      <div style={{ maxWidth: 380, margin: '0 auto', padding: '10vh 24px', position: 'relative', zIndex: 1 }}>
        <h2 className="ar ar1" style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--lilac)', marginBottom: 4 }}>
          begin your journey<span className="cursor"></span>
        </h2>
        <p className="prompt ar ar2" style={{ fontSize: 12, marginBottom: 28 }}>every great story starts with a single letter.</p>

        <div className="ar ar3" style={{ marginBottom: 14 }}>
          <div className="form-label">display name</div>
          <input className="ev-input" value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder="what should we call you?" />
        </div>
        <div className="ar ar3" style={{ marginBottom: 14 }}>
          <div className="form-label">email</div>
          <input className="ev-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@world.com" />
        </div>
        <div className="ar ar3" style={{ marginBottom: 14 }}>
          <div className="form-label">password</div>
          <input className="ev-input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="at least 6 characters" />
        </div>
        <div className="ar ar3" style={{ marginBottom: 20 }}>
          <div className="form-label">confirm password</div>
          <input className="ev-input" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="••••••" />
        </div>

        {error && (
          <p className="ar" style={{ color: 'var(--pink)', fontSize: 12, marginBottom: 14 }}>
            {'> '}{error}
          </p>
        )}

        <button className="btn btn-full ar ar4" onClick={handleRegister}>
          continue &rarr;
        </button>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 11, color: 'var(--tx4)' }}>
          already here? <a href="/login">sign in</a>
        </p>
      </div>
    </>
  )
}
