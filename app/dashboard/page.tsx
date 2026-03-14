'use client'

import { useState } from 'react'
import { Stars } from '@/components/Stars'
import { ThemeToggle } from '@/components/ThemeToggle'

const U = {
  name: 'luna', avatar: '🦢', city: 'istanbul',
  bio: 'writing letters to the universe and hoping it writes back.',
  book: 'the trial — kafka', song: 'exit music — radiohead',
  motto: 'slow things are the most beautiful things.',
  interests: ['philosophy', 'literature', 'music', 'astronomy'],
  xp: 300, xpNext: 600, level: 3, levelName: 'bloom',
  languages: ['en', 'tr'],
}

const LETTERS = [
  { id: 1, from: 'sora', avatar: '🌙', status: 'transit' as const, preview: 'dear luna, i\'ve been thinking about what you said — that sometimes silence between two people is more honest than words...', time: '85h left', distance: '8,500 km', progress: 65, route: 'tokyo → istanbul' },
  { id: 2, from: 'leo', avatar: '✦', status: 'transit' as const, preview: 'dear luna, your profile said you collect stories and sunsets. i collect half-finished thoughts...', time: '95h left', distance: '10,100 km', progress: 14, route: 'são paulo → istanbul' },
  { id: 3, from: 'iris', avatar: '🦋', status: 'delivered' as const, preview: 'chère luna, i found your profile and thought — here is someone who understands...', time: 'just now', distance: '2,200 km', route: 'paris → istanbul' },
  { id: 4, from: 'sora', avatar: '🌙', status: 'read' as const, preview: 'there\'s a japanese concept called "ma" — the space between. it\'s not emptiness...', time: '3d ago', distance: '8,500 km', route: 'tokyo → istanbul' },
]

const PALS = [
  { name: 'sora', avatar: '🌙', note: 'letter in transit', streak: 23 },
  { name: 'leo', avatar: '✦', note: 'awaiting reply', streak: 12 },
  { name: 'iris', avatar: '🦋', note: 'letter arrived', streak: 7 },
]

const statusMap = {
  transit: { label: 'in transit', cls: 'status-transit' },
  delivered: { label: 'delivered', cls: 'status-delivered' },
  read: { label: 'read', cls: 'status-read' },
}

export default function DashboardPage() {
  const [tab, setTab] = useState<'inbox' | 'sent' | 'archive'>('inbox')

  return (
    <>
      <Stars />

      {/* nav */}
      <nav className="topnav">
        <span className="nav-brand">everlong<span>_ letters that last</span></span>
        <div className="nav-search"><input placeholder="search..." /></div>
        <div className="nav-right">
          {['inbox', 'explore', 'bottle', 'memory', 'blog', 'profile'].map((item, i) => (
            <a key={item} href={item === 'inbox' ? '/dashboard' : `/${item}`} className={`nav-link ${i === 0 ? 'active' : ''}`}>{item}</a>
          ))}
          <ThemeToggle />
        </div>
      </nav>

      <div className="layout">
        {/* sidebar */}
        <aside className="sidebar">
          {/* profile */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
            <div className="avatar">{U.avatar}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--txt)' }}>@{U.name}</div>
              <div style={{ fontSize: 10, color: 'var(--tx4)' }}>{U.city}</div>
            </div>
          </div>

          <p style={{ fontSize: 11, color: 'var(--tx3)', fontStyle: 'italic', marginBottom: 12, lineHeight: 1.6 }}>{U.bio}</p>

          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 16 }}>
            {U.interests.map(i => <span key={i} className="tag">{i}</span>)}
          </div>

          <hr className="divider" />

          {/* level */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--tx3)', marginBottom: 4 }}>
              <span>lvl {U.level} — {U.levelName}</span>
              <span>{U.xp}/{U.xpNext} xp</span>
            </div>
            <div className="xp-bar"><div className="xp-fill" style={{ width: `${(U.xp / U.xpNext) * 100}%` }} /></div>
          </div>

          {/* now playing */}
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="music-wave"><span /><span /><span /><span /><span /></div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--txt)' }}>{U.song.split(' — ')[0]}</div>
              <div style={{ fontSize: 10, color: 'var(--tx4)' }}>{U.song.split(' — ')[1]}</div>
            </div>
          </div>

          <hr className="divider" />

          {/* reading & motto */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 9, color: 'var(--tx4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>reading</div>
            <div style={{ fontSize: 11, color: 'var(--tx3)', fontStyle: 'italic' }}>{U.book}</div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 9, color: 'var(--tx4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>motto</div>
            <div style={{ fontSize: 11, color: 'var(--tx3)', fontStyle: 'italic' }}>{U.motto}</div>
          </div>

          <hr className="divider" />

          {/* daily question */}
          <div className="card">
            <div style={{ fontSize: 9, color: 'var(--tx4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>daily question</div>
            <p style={{ fontSize: 12, color: 'var(--txt)', fontStyle: 'italic', marginBottom: 8, lineHeight: 1.5 }}>
              "if you could send one letter to your 16-year-old self, what would you say?"
            </p>
            <button className="btn btn-sm">answer</button>
          </div>

          <hr className="divider" />

          {/* pen pals */}
          <div className="sb-title">pen pals</div>
          {PALS.map(p => (
            <div key={p.name} className="sb-item">
              <div className="avatar" style={{ width: 28, height: 28, fontSize: 13 }}>{p.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: 'var(--txt)' }}>@{p.name}</div>
                <div className="sb-meta">{p.note}</div>
              </div>
              {p.streak > 0 && <span style={{ fontSize: 10, color: 'var(--tx4)' }}>{p.streak}d</span>}
            </div>
          ))}
        </aside>

        {/* main */}
        <div className="ev-main">
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--lilac)', marginBottom: 2 }}>
            your letters<span className="cursor"></span>
          </h2>
          <p className="prompt" style={{ fontSize: 11, marginBottom: 20 }}>patience is the point.</p>

          {/* tabs */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 20, borderBottom: '1px solid var(--brd)' }}>
            {(['inbox', 'sent', 'archive'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} className="nav-link" style={{
                borderBottom: tab === t ? '2px solid var(--lilac)' : '2px solid transparent',
                borderRadius: 0, color: tab === t ? 'var(--lilac)' : undefined,
              }}>
                {t}
              </button>
            ))}
          </div>

          {/* letters */}
          {LETTERS.map(letter => (
            <div key={letter.id} className="letter-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div className="avatar" style={{ width: 24, height: 24, fontSize: 12 }}>{letter.avatar}</div>
                  <span style={{ fontSize: 12, color: 'var(--lilac)' }}>@{letter.from}</span>
                  <span className={`letter-status ${statusMap[letter.status].cls}`}>{statusMap[letter.status].label}</span>
                </div>
                <span style={{ fontSize: 10, color: 'var(--tx4)' }}>{letter.time}</span>
              </div>

              <p style={{ fontSize: 12, color: 'var(--tx2)', lineHeight: 1.6, fontStyle: 'italic', marginBottom: 6, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                {letter.preview}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 10, color: 'var(--tx4)' }}>
                <span>{letter.route}</span>
                <span>{letter.distance}</span>
              </div>

              {letter.status === 'transit' && letter.progress && (
                <div className="journey">
                  <div className="journey-fill" style={{ width: `${letter.progress}%` }}>
                    <span className="journey-dot" />
                  </div>
                </div>
              )}
            </div>
          ))}

          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <a href="/compose" className="btn">compose a letter</a>
          </div>
        </div>
      </div>
    </>
  )
}
