'use client'

import { Stars } from '@/components/Stars'
import { ThemeToggle } from '@/components/ThemeToggle'

const U = {
  name: 'luna', avatar: '🦢', city: 'istanbul, turkey',
  bio: 'writing letters to the universe and hoping it writes back.',
  mbti: 'INFP', zodiac: 'pisces',
  book: 'the trial — kafka', song: 'exit music — radiohead', motto: 'slow things are the most beautiful things.',
  interests: ['philosophy', 'literature', 'music', 'astronomy'],
  xp: 300, xpNext: 600, level: 3, levelName: 'bloom',
  stamps: { earned: ['🌸', '🌙', '✦'], locked: ['⭐', '🌌', '💜', '🌑', '💫'] },
  streaks: [
    { name: 'sora', avatar: '🌙', city: 'tokyo', streak: 23 },
    { name: 'leo', avatar: '✦', city: 'são paulo', streak: 12 },
    { name: 'iris', avatar: '🦋', city: 'paris', streak: 7 },
  ],
}

export default function ProfilePage() {
  return (
    <>
      <Stars />
      <nav className="topnav">
        <span className="nav-brand">everlong<span>_ letters that last</span></span>
        <div className="nav-search"><input placeholder="search..." /></div>
        <div className="nav-right">
          {['inbox', 'explore', 'bottle', 'memory', 'blog', 'profile'].map((item) => (
            <a key={item} href={item === 'inbox' ? '/dashboard' : `/${item}`} className={`nav-link ${item === 'profile' ? 'active' : ''}`}>{item}</a>
          ))}
          <ThemeToggle />
        </div>
      </nav>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '80px 24px 60px', position: 'relative', zIndex: 1 }}>
        {/* header */}
        <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginBottom: 20 }}>
          <div className="avatar" style={{ width: 72, height: 72, fontSize: 36, borderRadius: 8 }}>{U.avatar}</div>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--lilac)' }}>@{U.name}<span className="cursor"></span></h2>
            <div style={{ fontSize: 12, color: 'var(--tx4)' }}>{U.city} · {U.mbti} · {U.zodiac}</div>
          </div>
        </div>

        <p style={{ fontSize: 14, color: 'var(--tx2)', fontStyle: 'italic', lineHeight: 1.8, marginBottom: 16 }}>{U.bio}</p>

        <div style={{ fontSize: 13, color: 'var(--tx3)', marginBottom: 6 }}>
          <span style={{ color: 'var(--lilac)' }}>reading:</span> {U.book}
        </div>
        <div style={{ fontSize: 13, color: 'var(--tx3)', marginBottom: 6 }}>
          <span style={{ color: 'var(--pink)' }}>listening:</span> {U.song}
        </div>
        <div style={{ fontSize: 13, color: 'var(--tx3)', marginBottom: 20 }}>
          <span style={{ color: 'var(--gold)' }}>motto:</span> {U.motto}
        </div>

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 28 }}>
          {U.interests.map(i => <span key={i} className="tag">{i}</span>)}
        </div>

        <hr className="divider" />

        {/* level */}
        <div className="form-label">level & xp</div>
        <div style={{ fontSize: 14, color: 'var(--lilac)', fontStyle: 'italic', marginBottom: 8 }}>
          🌸 {U.levelName} — level {U.level}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--tx3)', marginBottom: 6 }}>
          <span>{U.xp} / {U.xpNext} xp</span>
          <span>next: stargazer</span>
        </div>
        <div className="xp-bar" style={{ marginBottom: 28 }}>
          <div className="xp-fill" style={{ width: `${(U.xp / U.xpNext) * 100}%` }} />
        </div>

        <hr className="divider" />

        {/* stamps */}
        <div className="form-label">stamp collection</div>
        <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
          {U.stamps.earned.map(s => (
            <div key={s} className="avatar" style={{ width: 48, height: 48, fontSize: 22 }}>{s}</div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
          {U.stamps.locked.map(s => (
            <div key={s} className="avatar" style={{ width: 48, height: 48, fontSize: 22, opacity: 0.3 }}>{s}</div>
          ))}
        </div>

        <hr className="divider" />

        {/* streaks */}
        <div className="form-label">pen pal streaks</div>
        {U.streaks.map(p => (
          <div key={p.name} className="sb-item" style={{ marginBottom: 4 }}>
            <div className="avatar" style={{ width: 36, height: 36, fontSize: 16 }}>{p.avatar}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: 'var(--txt)' }}>@{p.name}</div>
              <div style={{ fontSize: 11, color: 'var(--tx4)' }}>{p.city}</div>
            </div>
            <span style={{ fontSize: 13, color: 'var(--gold)' }}>{p.streak}d 🔥</span>
          </div>
        ))}
      </div>
    </>
  )
}
