export default function Home() {
  return (
    <main style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <h1 style={{ 
        fontSize: '3rem', 
        fontWeight: '700', 
        marginBottom: '1rem',
        letterSpacing: '-0.05em'
      }}>
        MASS · QUIET
      </h1>
      <p style={{ 
        color: '#9A9A9A',
        fontSize: '1.25rem',
        marginBottom: '3rem'
      }}>
        Project Initialized
      </p>
      <div style={{
        padding: '1.5rem 2rem',
        border: '1px solid #333',
        borderRadius: '8px',
        fontSize: '0.875rem',
        color: '#666',
        maxWidth: '600px'
      }}>
        <p style={{ margin: 0 }}>
          ✓ Next.js 16 configured<br/>
          ✓ TypeScript enabled<br/>
          ✓ Ready for development
        </p>
      </div>
    </main>
  );
}
