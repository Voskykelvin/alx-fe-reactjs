import { create } from 'zustand';

const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],

  addRecipe: (newRecipe) => set((state) => ({
    recipes: [...state.recipes, newRecipe],
    filteredRecipes: [...state.filteredRecipes, newRecipe] // keep filtered in sync
  })),

  deleteRecipe: (id) => set((state) => ({
    recipes: state.recipes.filter((r) => r.id !== id),
    filteredRecipes: state.filteredRecipes.filter((r) => r.id !== id),
  })),

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

  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().filterRecipes(); // trigger filtering whenever search changes
  },

  filterRecipes: () => {
    const { recipes, searchTerm } = get();
    set({
      filteredRecipes: recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    });
  },
}));

export default useRecipeStore;
