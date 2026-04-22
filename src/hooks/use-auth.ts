import { useState } from 'react';
import type { AuthResponse } from '../types/auth';

const TOKEN_KEY = 'pantryscope_token' ;

export function useAuth() {
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem(TOKEN_KEY)
  );
  const [loading, setLoading] = useState(false) ;
  const [error, setError] = useState<string | null>(null);

  async function login(username: string, password: string) : Promise<void> {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://dummyjson.com/auth/login',  {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'  },
        body: JSON.stringify({ username, password } ),
      });

      if (!res.ok) {
        setError('Credenciales incorrectas. Intenta de nuevo.') ;
        return;
      }

      const data: AuthResponse = await res.json() ;

      localStorage.setItem(TOKEN_KEY, data.acessToken);
      setToken(data.acessToken);
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  function logout(): void {
    localStorage.removeItem(TOKEN_KEY) ;
    setToken(null);
  }

  return { token, loading, error, login, logout };
}