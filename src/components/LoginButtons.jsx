import { supabase } from "../lib/supabase";

export default function LoginButtons() {
  const signIn = (provider) => {
    // Obtener la URL actual para usar el puerto correcto
    const currentUrl = window.location.origin;
    
    supabase.auth.signInWithOAuth({
      provider,
      options: { 
        redirectTo: `${currentUrl}/api/auth/callback`
      }
    });
  };

  const buttonStyle = {
    padding: '12px 24px',
    margin: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <button 
        onClick={() => signIn('github')}
        style={{
          ...buttonStyle,
          background: '#24292e',
          color: 'white'
        }}
      >
        Login con GitHub
      </button>
      <button 
        onClick={() => signIn('google')}
        style={{
          ...buttonStyle,
          background: '#4285f4',
          color: 'white'
        }}
      >
        Login con Google
      </button>
    </div>
  );
}
