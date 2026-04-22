import { useState } from 'react';

interface Props {
    onLogin: (username: string, password: string) => Promise<void>;
    loading: boolean;
    error: string | null;
}

export function LoginForm({ onLogin, loading, error }: Props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (

        <div>
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
                PantryScope
            </h1>
            <div>
                <label>
                    Usuario
                </label>
                <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label>
                    Contraseña
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <br />
                <br />
            </div>

            {error && (
                <p className="text-red-500 text-sm mb-4">{error}</p>
            )}

            <button
                onClick={() => onLogin(username, password)}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                {loading ? 'Ingresando…' : 'Iniciar sesión'}
            </button>
        </div>

    );
}