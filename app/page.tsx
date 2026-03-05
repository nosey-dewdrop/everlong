export default function Home() {
  return (
    <main style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '3.5rem', color: '#B8A4D6', marginBottom: '8px' }}>
          everlong
        </h1>
        <p style={{ fontFamily: 'Outfit, sans-serif', color: '#7E7290', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '40px' }}>
          letters that last
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <a href="/login" style={{ padding: '10px 28px', borderRadius: '10px', background: '#B8A4D6', color: '#0C0A10', fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: '13px' }}>
            sign in
          </a>
          <a href="/register" style={{ padding: '10px 28px', borderRadius: '10px', border: '1px solid #2A2538', color: '#7E7290', fontFamily: 'Outfit, sans-serif', fontSize: '13px' }}>
            create account
          </a>
        </div>
      </div>
    </main>
  )
}