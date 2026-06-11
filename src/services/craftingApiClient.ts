import type { Recipe } from "@/types/crafting";

type RecipesApiResponse = {
  recipes: Recipe[];
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

  if (!response.ok) {
    throw new Error("Não foi possível carregar as receitas disponíveis.");
  }

  const data: unknown = await response.json();

  // Valida o formato mínimo da resposta antes de entregar os dados para o hook.
  if (!isValidRecipesResponse(data)) {
    throw new Error("A resposta de receitas veio em um formato inesperado.");
  }

  return data.recipes;
}