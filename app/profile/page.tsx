'use client'

import { Stars } from '@/components/Stars'
import { ThemeToggle } from '@/components/ThemeToggle'
import { PixelAvatar } from '@/components/PixelAvatar'

function simplifyRatio(a: number, b: number): [number, number] {
  if (a === 0 && b === 0) return [0, 0]
  if (a === 0) return [0, b > 100 ? Math.round(b / Math.pow(10, Math.floor(Math.log10(b)) - 1)) : b]
  if (b === 0) return [a > 100 ? Math.round(a / Math.pow(10, Math.floor(Math.log10(a)) - 1)) : a, 0]

  const gcd = (x: number, y: number): number => y === 0 ? x : gcd(y, x % y)
  const g = gcd(a, b)
  let sa = a / g
  let sb = b / g

  // if still too big, round down
  if (sa > 100 || sb > 100) {
    const scale = Math.max(sa, sb) / 100
    sa = Math.round(sa / scale)
    sb = Math.round(sb / scale)
  }

  return [sa, sb]
}

const U = {
  name: 'luna', city: 'istanbul, turkey',
  bio: 'writing letters to the universe and hoping it writes back.',
  mbti: 'INFP', zodiac: 'pisces',
  book: 'the trial — kafka', song: 'exit music — radiohead', motto: 'slow things are the most beautiful things.',
  interests: ['philosophy', 'literature', 'music', 'astronomy'],
  xp: 300, xpNext: 600, level: 3, levelName: 'bloom',
  stamps: { earned: ['🌸', '🌙', '✦'], locked: ['⭐', '🌌', '💜', '🌑', '💫'] },
  // letter stats
  sent: 27, received: 9,
  // reply times in hours for past letters
  replyTimes: [48, 72, 36, 96, 24, 168, 52, 44],
  streaks: [
    { name: 'sora', city: 'tokyo', streak: 23 },
    { name: 'leo', city: 'são paulo', streak: 12 },
    { name: 'iris', city: 'paris', streak: 7 },
  ],
  avatarSeed: 'luna',
}

function formatReplyTime(hours: number): string {
  if (hours < 24) return `~${Math.round(hours)}h`
  const days = Math.round(hours / 24)
  if (days === 1) return '~1 day'
  if (days < 7) return `~${days} days`
  const weeks = Math.round(days / 7)
  return weeks === 1 ? '~1 week' : `~${weeks} weeks`
}

export default function ProfilePage() {
  const avgReply = U.replyTimes.length > 0
    ? U.replyTimes.reduce((a, b) => a + b, 0) / U.replyTimes.length
    : 0

  const [ratioSent, ratioReceived] = simplifyRatio(U.sent, U.received)

  return (
    <>
      <Stars />
      <nav className="topnav">
        <span className="nav-brand">forget-me-not<span>_ letters that last</span></span>
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
          <PixelAvatar seed={U.avatarSeed} size={72} />
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--lilac)' }}>@{U.name}<span className="cursor"></span></h2>
            <div style={{ fontSize: 12, color: 'var(--tx4)' }}>{U.city} · {U.mbti} · {U.zodiac}</div>
          </div>
        </div>

        <p style={{ fontSize: 14, color: 'var(--tx2)', lineHeight: 1.8, marginBottom: 16 }}>{U.bio}</p>

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

        {/* letter stats */}
        <div className="form-label">letter stats</div>
        <div style={{ display: 'flex', gap: 32, marginBottom: 28 }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--tx4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>sent / received</div>
            <div style={{ fontSize: 16, color: 'var(--txt)', fontWeight: 700 }}>
              {ratioSent}:{ratioReceived}
              <span style={{ fontSize: 11, color: 'var(--tx4)', fontWeight: 400, marginLeft: 8 }}>({U.sent} / {U.received})</span>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--tx4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>avg reply time</div>
            <div style={{ fontSize: 16, color: 'var(--txt)', fontWeight: 700 }}>
              {avgReply > 0 ? formatReplyTime(avgReply) : 'n/a'}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--tx4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>total letters</div>
            <div style={{ fontSize: 16, color: 'var(--txt)', fontWeight: 700 }}>{U.sent + U.received}</div>
          </div>
        </div>

        <hr className="divider" />

        {/* level */}
        <div className="form-label">level & xp</div>
        <div style={{ fontSize: 14, color: 'var(--lilac)', marginBottom: 8 }}>
          {U.levelName} — level {U.level}
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
            <PixelAvatar seed={p.name} size={36} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: 'var(--txt)' }}>@{p.name}</div>
              <div style={{ fontSize: 11, color: 'var(--tx4)' }}>{p.city}</div>
            </div>
            <span style={{ fontSize: 13, color: 'var(--gold)' }}>{p.streak}d</span>
          </div>
        ))}
      </div>
    </>
  )
}
