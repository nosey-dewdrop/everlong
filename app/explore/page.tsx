'use client'

import { useState } from 'react'
import { Stars } from '@/components/Stars'
import { ThemeToggle } from '@/components/ThemeToggle'

const FILTERS = ['all', 'philosophy', 'literature', 'music', 'astronomy', 'slow living']
const LANGUAGES = ['all', 'english', 'türkçe', '日本語', 'français']

const PEOPLE = [
  { name: 'sora', avatar: '🌙', city: 'tokyo, japan', bio: 'i collect silences from different cities. tokyo\'s silence sounds like rain on temple roofs.', interests: ['philosophy', 'music', 'astronomy'], mbti: 'INFJ', zodiac: 'pisces', compat: 92 },
  { name: 'leo', avatar: '✦', city: 'são paulo, brazil', bio: 'half-finished thoughts collector. i believe the best poems are the ones you whisper to yourself on the bus.', interests: ['literature', 'music', 'philosophy'], mbti: 'INFP', zodiac: 'aquarius', compat: 87 },
  { name: 'iris', avatar: '🦋', city: 'paris, france', bio: 'watching sunsets from montmartre without photographing them. some beautiful things should just exist.', interests: ['literature', 'art', 'philosophy'], mbti: 'ENFP', zodiac: 'libra', compat: 85 },
  { name: 'kai', avatar: '🌿', city: 'kyoto, japan', bio: 'tea ceremony practitioner. i think the space between words is where meaning lives.', interests: ['philosophy', 'slow living', 'astronomy'], mbti: 'INTJ', zodiac: 'virgo', compat: 81 },
  { name: 'nova', avatar: '☁', city: 'reykjavik, iceland', bio: 'northern lights watcher. collecting handwritten letters from every continent.', interests: ['astronomy', 'writing', 'photography'], mbti: 'INTP', zodiac: 'sagittarius', compat: 78 },
  { name: 'emi', avatar: '🪻', city: 'seoul, korea', bio: 'bookshop wanderer and rooftop stargazer. i write letters i never send.', interests: ['literature', 'astronomy', 'music'], mbti: 'ISFP', zodiac: 'cancer', compat: 76 },
]

export default function ExplorePage() {
  const [filter, setFilter] = useState('all')
  const [lang, setLang] = useState('all')

  const filtered = filter === 'all' ? PEOPLE : PEOPLE.filter(p => p.interests.includes(filter))

  return (
    <>
      <Stars />
      <nav className="topnav">
        <span className="nav-brand">everlong<span>_ letters that last</span></span>
        <div className="nav-search"><input placeholder="search..." /></div>
        <div className="nav-right">
          {['inbox', 'explore', 'bottle', 'memory', 'blog', 'profile'].map((item) => (
            <a key={item} href={item === 'inbox' ? '/dashboard' : `/${item}`} className={`nav-link ${item === 'explore' ? 'active' : ''}`}>{item}</a>
          ))}
          <ThemeToggle />
        </div>
      </nav>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '80px 24px 60px', position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--lilac)', marginBottom: 4 }}>
          explore<span className="cursor"></span>
        </h2>
        <p className="prompt" style={{ fontSize: 13, marginBottom: 24 }}>find kindred spirits across the world.</p>

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
          {LANGUAGES.map(l => (
            <button key={l} className="tag" onClick={() => setLang(l)}
              style={{ cursor: 'pointer', borderColor: lang === l ? 'var(--lilac)' : undefined, color: lang === l ? 'var(--lilac)' : undefined }}>
              {l}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 32 }}>
          {FILTERS.map(f => (
            <button key={f} className="tag" onClick={() => setFilter(f)}
              style={{ cursor: 'pointer', borderColor: filter === f ? 'var(--lilac)' : undefined, color: filter === f ? 'var(--lilac)' : undefined }}>
              {f}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
          {filtered.map(p => (
            <div key={p.name} className="card" style={{ cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div className="avatar" style={{ width: 44, height: 44, fontSize: 20 }}>{p.avatar}</div>
                <div>
                  <div style={{ fontSize: 14, color: 'var(--lilac)', fontWeight: 700 }}>@{p.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--tx4)' }}>{p.city}</div>
                </div>
                <span style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--pink)', fontWeight: 700 }}>{p.compat}%</span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--tx2)', lineHeight: 1.7, marginBottom: 12, fontStyle: 'italic' }}>{p.bio}</p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
                {p.interests.map(i => <span key={i} className="tag">{i}</span>)}
              </div>
              <div style={{ fontSize: 11, color: 'var(--tx4)' }}>{p.mbti} · {p.zodiac}</div>
              <a href="/compose" className="btn btn-sm" style={{ marginTop: 12 }}>write a letter</a>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
