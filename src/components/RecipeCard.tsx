import type { Recipe } from '../types/recipe';

function getTotalTime(prep: number, cook: number): number {
  return prep + cook;
}

interface Props {
  recipe: Recipe;
  onClick: (id: number) => void;
}

export function RecipeCard({ recipe, onClick }: Props) {
  const totalTime = getTotalTime(recipe.prepTimeMinutes, recipe.cookTimeMinutes);

  return (
    <div
      onClick={() => onClick(recipe.id)}
      className="bg-white rounded-xl shadow hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
    >
      <img
        src={recipe.image}
        alt={recipe.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="font-bold text-gray-800 text-lg mb-1 truncate">
          {recipe.name}
        </h2>
        <p className="text-sm text-gray-500 mb-3">{recipe.cuisine}</p>

        <div className="flex flex-wrap gap-2 text-xs text-gray-600">
          <span className="bg-gray-100 px-2 py-1 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M360-840v-80h240v80H360Zm80 440h80v-240h-80v240Zm-99.5 291.5Q275-137 226-186t-77.5-114.5Q120-366 120-440t28.5-139.5Q177-645 226-694t114.5-77.5Q406-800 480-800q62 0 119 20t107 58l56-56 56 56-56 56q38 50 58 107t20 119q0 74-28.5 139.5T734-186q-49 49-114.5 77.5T480-80q-74 0-139.5-28.5ZM678-242q82-82 82-198t-82-198q-82-82-198-82t-198 82q-82 82-82 198t82 198q82 82 198 82t198-82ZM480-440Z"/></svg> {totalTime} min
          </span>
          <span className="bg-gray-100 px-2 py-1 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffee00"><path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z"/></svg> {recipe.rating}
          </span>
          <span className="bg-gray-100 px-2 py-1 rounded-full">
            {recipe.difficulty}
          </span>
        </div>
      </div>
    </div>
  );
}