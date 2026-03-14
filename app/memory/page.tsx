'use client'

import { useState } from 'react'
import { Stars } from '@/components/Stars'
import { ThemeToggle } from '@/components/ThemeToggle'

const FILTERS = ['all', 'to myself', 'unsent', 'time capsules']

const MEMORIES = [
  { id: 1, to: 'my 16-year-old self', date: 'mar 2, 2026', preview: 'you don\'t know it yet, but the things that feel like endings are actually beginnings...', tags: ['self', 'reflection'], capsule: null },
  { id: 2, to: 'someone i never told', date: 'feb 14, 2026', preview: 'i wrote this on the train home. you were sitting across from me and i wanted to say...', tags: ['unsent', 'love'], capsule: null },
  { id: 3, to: 'future me', date: 'jan 28, 2026', preview: 'if you\'re reading this, i hope you still watch the stars and talk to the moon...', tags: ['self', 'daily'], capsule: 'dec 31, 2026' },
]

export default function MemoryPage() {
  const [filter, setFilter] = useState('all')

  return (
    <>
      <Stars />
      <nav className="topnav">
        <span className="nav-brand">everlong<span>_ letters that last</span></span>
        <div className="nav-search"><input placeholder="search..." /></div>
        <div className="nav-right">
          {['inbox', 'explore', 'bottle', 'memory', 'blog', 'profile'].map((item) => (
            <a key={item} href={item === 'inbox' ? '/dashboard' : `/${item}`} className={`nav-link ${item === 'memory' ? 'active' : ''}`}>{item}</a>
          ))}
          <ThemeToggle />
        </div>
      </nav>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '80px 24px 60px', position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--lilac)', marginBottom: 4 }}>
          memory box<span className="cursor"></span>
        </h2>
        <p className="prompt" style={{ fontSize: 13, marginBottom: 24 }}>letters written, never meaning to send.</p>

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 24 }}>
          {FILTERS.map(f => (
            <button key={f} className="tag" onClick={() => setFilter(f)}
              style={{ cursor: 'pointer', borderColor: filter === f ? 'var(--lilac)' : undefined, color: filter === f ? 'var(--lilac)' : undefined }}>
              {f}
            </button>
          ))}
        </div>

        <a href="/compose" className="btn" style={{ marginBottom: 32, display: 'inline-block' }}>write to memory box</a>

        {MEMORIES.map(m => (
          <div key={m.id} className="letter-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 22 }}>✦</span>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--tx4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>to:</div>
                  <div style={{ fontSize: 14, color: 'var(--txt)' }}>{m.to}</div>
                </div>
              </div>
              <span style={{ fontSize: 11, color: 'var(--tx4)' }}>{m.date}</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--tx2)', fontStyle: 'italic', lineHeight: 1.7, marginBottom: 10 }}>{m.preview}</p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
              {m.tags.map(t => <span key={t} className="tag">{t}</span>)}
              {m.capsule && <span style={{ fontSize: 11, color: 'var(--gold)', marginLeft: 8 }}>opens {m.capsule}</span>}
            </div>
            {!m.capsule && (
              <button className="btn btn-sm" style={{ marginTop: 10 }}>unseal & send</button>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
