import { Stars } from '@/components/Stars'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function Home() {
  return (
    <>
      <Stars />
      <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 10 }}><ThemeToggle /></div>
      <section className="hero">
        <h1 className="hero-title ar ar1">forget-me-not<span className="cursor"></span></h1>
        <p className="hero-sub ar ar2">letters that last.</p>
        <p className="hero-desc ar ar3">
          write a letter. watch it travel across the world.<br />
          wait. real connection takes time.
        </p>

        <div className="ar ar4" style={{ display: 'flex', gap: 16, marginBottom: 64 }}>
          <a href="/register" className="btn">start writing</a>
          <a href="/login" className="btn-ghost">sign in</a>
        </div>

        <div className="ar ar5" style={{ display: 'flex', gap: 64, justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', maxWidth: 160 }}>
            <div style={{ fontSize: 20, color: 'var(--lilac)', marginBottom: 8 }}>∞</div>
            <div className="prompt" style={{ fontSize: 12 }}>distance-based delivery</div>
          </div>
          <div style={{ textAlign: 'center', maxWidth: 160 }}>
            <div style={{ fontSize: 20, color: 'var(--pink)', marginBottom: 8 }}>~</div>
            <div className="prompt" style={{ fontSize: 12 }}>bottle mail to strangers</div>
          </div>
          <div style={{ textAlign: 'center', maxWidth: 160 }}>
            <div style={{ fontSize: 20, color: 'var(--gold)', marginBottom: 8 }}>□</div>
            <div className="prompt" style={{ fontSize: 12 }}>letters never meant to send</div>
          </div>
        </div>

        <p className="ar ar5" style={{ marginTop: 64, fontSize: 12, color: 'var(--tx4)' }}>
          for the dreamers, the overthinkers, the ones who still<br />
          believe slow things are the most beautiful things.
        </p>
      </section>
    </>
  )
}
