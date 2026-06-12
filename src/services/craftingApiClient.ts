import type { Recipe } from "@/types/crafting";

type RecipesApiResponse = {
  recipes: Recipe[];
  dataSource?: string;
  error?: string;
};

function isValidRecipesResponse(value: unknown): value is RecipesApiResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    "recipes" in value &&
    Array.isArray((value as RecipesApiResponse).recipes)
  );
}

export async function fetchAvailableRecipes(): Promise<Recipe[]> {
  const response = await fetch("/api/crafting/recipes");
  const data: unknown = await response.json();

  if (!isValidRecipesResponse(data)) {
    throw new Error("A resposta de receitas veio em um formato inesperado.");
  }

  if (!response.ok) {
    throw new Error(
      data.error ?? "Não foi possível carregar as receitas disponíveis."
    );
  }

  return data.recipes;
}