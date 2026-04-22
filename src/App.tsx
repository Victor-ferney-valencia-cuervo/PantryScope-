import { useState } from 'react';
import { useAuth } from './hooks/use-auth';
import { useRecipes } from './hooks/use-recipes';
import { RecipeCard } from './components/RecipeCard';
import { LoginForm } from './components/LoginForm';
import { STUDENT } from './student';

const { token, loading: authLoading, error: authError, login, logout } = useAuth();
const [selectedId,setSelectedId] = useState<number | null>(null);

const { recipes, loading, error, retry } = useRecipes(
  token ?? '',
  logout,
);

function App() {


  if (!token) {
    return <LoginForm onLogin={login} loading={authLoading} error={authError} />;
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
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && !loading && (
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={retry}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reintentar
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recipes.map(recipe => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onClick={setSelectedId}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
export default App
