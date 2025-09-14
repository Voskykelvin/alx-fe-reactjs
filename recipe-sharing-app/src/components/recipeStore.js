import { create } from 'zustand';

const useRecipeStore = create((set, get) => ({
  // --- Core state ---
  recipes: [],

  // --- Search / Filter ---
  searchTerm: '',
  filteredRecipes: [],

  // --- Favorites ---
  favorites: [],

  // --- Recommendations ---
  recommendations: [],

  // --- Recipe actions ---
  addRecipe: (newRecipe) => set((state) => {
    const updatedRecipes = [...state.recipes, newRecipe];
    return {
      recipes: updatedRecipes,
      filteredRecipes: updatedRecipes.filter((r) =>
        r.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      ),
    };
  }),

  deleteRecipe: (id) => set((state) => {
    const updatedRecipes = state.recipes.filter((r) => r.id !== id);
    return {
      recipes: updatedRecipes,
      filteredRecipes: updatedRecipes.filter((r) =>
        r.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      ),
      favorites: state.favorites.filter((favId) => favId !== id),
      recommendations: state.recommendations.filter((r) => r.id !== id),
    };
  }),

  updateRecipe: (id, updatedFields) => set((state) => {
    const updatedRecipes = state.recipes.map((r) =>
      r.id === id ? { ...r, ...updatedFields } : r
    );
    return {
      recipes: updatedRecipes,
      filteredRecipes: updatedRecipes.filter((r) =>
        r.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      ),
    };
  }),

  // --- Search actions ---
  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().filterRecipes();
  },

  filterRecipes: () => {
    const { recipes, searchTerm } = get();
    set({
      filteredRecipes: recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    });
  },

  // --- Favorites actions ---
  addFavorite: (recipeId) => set((state) => ({
    favorites: [...new Set([...state.favorites, recipeId])],
  })),

  removeFavorite: (recipeId) => set((state) => ({
    favorites: state.favorites.filter((id) => id !== recipeId),
  })),

  // --- Recommendations (mock for now) ---
  generateRecommendations: () => {
    const { recipes, favorites } = get();
    const recommended = recipes.filter(
      (recipe) => favorites.includes(recipe.id) && Math.random() > 0.5
    );
    set({ recommendations: recommended });
  },
}));

export default useRecipeStore;
