import { mockRecipes } from "@/data/mockCraftingData";
import type { Recipe } from "@/types/crafting";

export function getAvailableRecipes(): Recipe[] {
  // Centraliza a origem das receitas para facilitar a troca futura por dados reais.
  return mockRecipes;
}