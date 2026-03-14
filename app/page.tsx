import { Stars } from '@/components/Stars'

export default function Home() {
  return (
    <>
      <Stars />
      <section className="hero">
        <h1 className="hero-title ar ar1">everlong<span className="cursor"></span></h1>
        <p className="hero-sub ar ar2">letters that last.</p>
        <p className="hero-desc ar ar3">
          write a letter. watch it travel across the world.<br />
          wait. real connection takes time.
        </p>

        <div className="ar ar4" style={{ display: 'flex', gap: 12, marginBottom: 48 }}>
          <a href="/register" className="btn">start writing</a>
          <a href="/login" className="btn-ghost">sign in</a>
        </div>

        <div className="ar ar5" style={{ display: 'flex', gap: 40, justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: 'var(--lilac)', marginBottom: 4 }}>∞</div>
            <div className="prompt" style={{ fontSize: 10 }}>distance-based delivery</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: 'var(--pink)', marginBottom: 4 }}>~</div>
            <div className="prompt" style={{ fontSize: 10 }}>bottle mail to strangers</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: 'var(--gold)', marginBottom: 4 }}>□</div>
            <div className="prompt" style={{ fontSize: 10 }}>letters never meant to send</div>
          </div>
        </div>

        <p className="ar ar5" style={{ marginTop: 48, fontSize: 11, color: 'var(--tx4)', fontStyle: 'italic' }}>
          for the dreamers, the overthinkers, the ones who still<br />
          believe slow things are the most beautiful things.
        </p>
      </section>
    </>
  )
}
