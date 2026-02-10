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
        marginBottom: '0.5rem',
        letterSpacing: '-0.05em'
      }}>
        MASS · QUIET
      </h1>
      <p style={{ 
        color: '#B5B09A',
        fontSize: '1.5rem',
        marginBottom: '3rem',
        fontWeight: '500'
      }}>
        PROJECT_NAME_PLACEHOLDER
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
          ✓ Ready for development
        </p>
      </div>
    </main>
  );
}
