'use client'

import { useState } from 'react'
import { Stars } from '@/components/Stars'
import { ThemeToggle } from '@/components/ThemeToggle'

const STAMPS = ['🌸', '🌙', '✦', '🐚', '🕊']

export default function ComposePage() {
  const [to, setTo] = useState('')
  const [body, setBody] = useState('')
  const [stamp, setStamp] = useState('🌸')
  const [song, setSong] = useState('')

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
          write a letter<span className="cursor"></span>
        </h2>
        <p className="prompt" style={{ fontSize: 13, marginBottom: 32 }}>take your time. every word carries weight.</p>

        <div style={{ marginBottom: 20 }}>
          <div className="form-label">to</div>
          <input className="ev-input" value={to} onChange={e => setTo(e.target.value)} placeholder="search for a pen pal..." />
        </div>

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
            {body.length} characters {body.length < 50 && '· min 50 for full xp'}
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div className="form-label">choose a stamp</div>
          <div style={{ display: 'flex', gap: 10 }}>
            {STAMPS.map(s => (
              <button
                key={s}
                onClick={() => setStamp(s)}
                className="avatar"
                style={{
                  width: 48, height: 48, fontSize: 22, cursor: 'pointer',
                  borderColor: stamp === s ? 'var(--lilac)' : 'var(--brd)',
                  background: stamp === s ? 'var(--acf)' : 'var(--bg2)',
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 32 }}>
          <div className="form-label">attach a song (optional)</div>
          <input className="ev-input" value={song} onChange={e => setSong(e.target.value)} placeholder="spotify or apple music link..." />
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn" style={{ flex: 1 }}>send letter</button>
          <button className="btn-ghost">save to memory box</button>
        </div>
      </div>
    </>
  )
}
