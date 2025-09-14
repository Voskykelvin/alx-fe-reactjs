import { create } from 'zustand';

const useRecipeStore = create((set) => ({
  recipes: [],

  // Add a new recipe
  addRecipe: (newRecipe) =>
    set((state) => ({
      recipes: [...state.recipes, newRecipe],
    })),

  // Replace or initialize recipe list
  setRecipes: (recipes) => set({ recipes }),
}));

export default useRecipeStore;
