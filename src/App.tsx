import { useAuth } from './hooks/use-auth';
import { LoginForm } from './components/LoginForm';
import { STUDENT } from './student';

function App() {
  const { token, loading, error, login, logout } = useAuth();
  if (!token) {
    return <LoginForm onLogin={login} loading={loading} error={error} />;
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">PantryScope</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Hecho por {STUDENT.fullName}</span>
          <button
            onClick={logout}
            className="text-sm bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </header>
      <main className="p-6">
        <p className="text-gray-600">Vista principal — próximamente recetas</p>
      </main>
    </div>
  )
}
export default App
