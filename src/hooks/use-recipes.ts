import { useState, useEffect } from 'react';
import type { Recipe, RecipesResponse } from '../types/recipe';

interface UseRecipesResult {
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
  retry: () => void;
}

export function useRecipes(
  token: string,
  onUnauthorized: () => void,
  tag?: string
): UseRecipesResult {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function fetchRecipes() {
      setLoading(true);
      setError(null);

      const url = tag
        ? `https://dummyjson.com/recipes/tag/${tag}`
        : `https://dummyjson.com/recipes?limit=20&skip=0`;

      try {
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          onUnauthorized();
          return;
        }

        if (!res.ok) {
          setError('Error al cargar las recetas.');
          return;
        }

        const data: RecipesResponse = await res.json();
        if (!cancelled) setRecipes(data.recipes);
      } catch {
        if (!cancelled) setError('Error de conexión.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchRecipes();
    return () => { cancelled = true; };
  }, [token, tag, attempt]);

  function retry() {
    setAttempt(a => a + 1);
  }

  return { recipes, loading, error, retry };
}