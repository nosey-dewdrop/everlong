export default function Home() {
  return (
    <main style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '3.5rem', color: '#B8A4D6', marginBottom: '8px' }}>
          everlong
        </h1>
        <p style={{ fontFamily: 'Outfit, sans-serif', color: '#7E7290', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          letters that last
        </p>
      </div>
    </main>
  )
}