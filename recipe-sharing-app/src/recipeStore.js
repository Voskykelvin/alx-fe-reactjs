import { create } from 'zustand';

const useRecipeStore = create((set, get) => ({
  recipes: [],

  // New: Favorites
  favorites: [],

  // New: Recommendations
  recommendations: [],

  // --- Existing recipe actions ---
  addRecipe: (newRecipe) => set((state) => ({
    recipes: [...state.recipes, newRecipe],
  })),

  deleteRecipe: (id) => set((state) => ({
    recipes: state.recipes.filter((r) => r.id !== id),
    favorites: state.favorites.filter((favId) => favId !== id), // keep favorites clean
  })),

  updateRecipe: (id, updatedFields) => set((state) => ({
    recipes: state.recipes.map((r) =>
      r.id === id ? { ...r, ...updatedFields } : r
    ),
  })),

  // --- Favorites actions ---
  addFavorite: (recipeId) => set((state) => ({
    favorites: [...new Set([...state.favorites, recipeId])], // prevent duplicates
  })),

  removeFavorite: (recipeId) => set((state) => ({
    favorites: state.favorites.filter((id) => id !== recipeId),
  })),

  // --- Mock Recommendations ---
  generateRecommendations: () => {
    const { recipes, favorites } = get();
    const recommended = recipes.filter(
      (recipe) =>
        favorites.includes(recipe.id) && Math.random() > 0.5
    );
    set({ recommendations: recommended });
  },
}));

export default useRecipeStore;
