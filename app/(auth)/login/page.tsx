export default function LoginPage() {
  return (
    <main style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '40px' }}>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '2.5rem', color: '#B8A4D6', marginBottom: '8px' }}>
          welcome back
        </h1>
        <p style={{ fontFamily: 'Outfit, sans-serif', color: '#7E7290', fontSize: '12px', marginBottom: '32px' }}>
          your letters are waiting
        </p>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#7B68A0', marginBottom: '5px' }}>
            email
          </label>
          <input type="email" placeholder="your@email.com" style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #2A2538', background: '#110F16', fontSize: '13px', color: '#EDE8F2', outline: 'none', fontFamily: 'Outfit, sans-serif' }} />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#7B68A0', marginBottom: '5px' }}>
            password
          </label>
          <input type="password" placeholder="••••••••" style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #2A2538', background: '#110F16', fontSize: '13px', color: '#EDE8F2', outline: 'none', fontFamily: 'Outfit, sans-serif' }} />
        </div>

        <button style={{ width: '100%', padding: '11px', borderRadius: '10px', background: '#B8A4D6', color: '#0C0A10', fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: '13px', border: 'none', cursor: 'pointer' }}>
          sign in
        </button>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px', color: '#514768' }}>
          no account? <a href="/register" style={{ color: '#B8A4D6' }}>create one</a>
        </p>
      </div>
    </main>
  )
}