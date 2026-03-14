'use client'

import { Stars } from '@/components/Stars'
import { ThemeToggle } from '@/components/ThemeToggle'

const BOTTLES = [
  { id: 1, status: 'traveling' as const, preview: '"i wonder if anyone else watches the 5:47am sky and thinks about how small we are..."', time: '2 days ago', note: 'somewhere in the atlantic...' },
  { id: 2, status: 'found' as const, preview: '"to whoever finds this — i hope you\'re having the kind of night where the stars feel close..."', time: '5 days ago', note: 'found by someone in oslo' },
]

export default function BottlePage() {
  return (
    <>
      <Stars />
      <nav className="topnav">
        <span className="nav-brand">forget-me-not<span>_ letters that last</span></span>
        <div className="nav-search"><input placeholder="search..." /></div>
        <div className="nav-right">
          {['inbox', 'explore', 'bottle', 'memory', 'blog', 'profile'].map((item) => (
            <a key={item} href={item === 'inbox' ? '/dashboard' : `/${item}`} className={`nav-link ${item === 'bottle' ? 'active' : ''}`}>{item}</a>
          ))}
          <ThemeToggle />
        </div>
      </nav>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '80px 24px 60px', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🐚</div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--lilac)', marginBottom: 4 }}>
            bottle mail<span className="cursor"></span>
          </h2>
          <p className="prompt" style={{ fontSize: 13 }}>throw a letter into the ocean. someone, somewhere, will find it.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 40 }}>
          <a href="/compose" className="card" style={{ textAlign: 'center', textDecoration: 'none', padding: 28 }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>✉</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--lilac)', marginBottom: 4 }}>throw a bottle</div>
            <div style={{ fontSize: 12, color: 'var(--tx3)' }}>write a letter to a stranger</div>
          </a>
          <button className="card" style={{ textAlign: 'center', cursor: 'pointer', padding: 28 }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>🌊</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--lilac)', marginBottom: 4 }}>find a bottle</div>
            <div style={{ fontSize: 12, color: 'var(--tx3)' }}>discover a letter from the ocean</div>
          </button>
        </div>

        <div className="form-label" style={{ marginBottom: 16 }}>your bottles</div>

        {BOTTLES.map(b => (
          <div key={b.id} className="letter-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span className={`letter-status ${b.status === 'traveling' ? 'status-transit' : 'status-delivered'}`}>
                {b.status === 'traveling' ? '🕊 traveling' : '✦ found'}
              </span>
              <span style={{ fontSize: 11, color: 'var(--tx4)' }}>{b.time}</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--tx2)', lineHeight: 1.7, marginBottom: 6 }}>{b.preview}</p>
            <div style={{ fontSize: 11, color: 'var(--tx4)' }}>{b.note}</div>
            {b.status === 'found' && (
              <button className="btn btn-sm" style={{ marginTop: 10 }}>+ add pen pal</button>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
