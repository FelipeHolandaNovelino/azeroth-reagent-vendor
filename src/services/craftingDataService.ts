import { getCraftingDataSource } from "@/config/craftingDataSourceConfig";
import { mockRecipes } from "@/data/mockCraftingData";
import type { Recipe } from "@/types/crafting";

async function getMockRecipes(): Promise<Recipe[]> {
  // Mantém os dados fictícios como fonte padrão para desenvolvimento e portfólio.
  return mockRecipes;
}

async function getBlizzardRecipes(): Promise<Recipe[]> {
  // A integração real será adicionada em uma etapa futura usando:
  // - blizzardAuthService
  // - blizzardApiService
  // - blizzardRecipeAdapter
  //
  // Por enquanto, esta mensagem evita que o modo Blizzard pareça funcional antes da hora.
  throw new Error(
    "Blizzard data source is not implemented yet. Use CRAFTING_DATA_SOURCE=mock."
  );
}

export async function getAvailableRecipes(): Promise<Recipe[]> {
  const dataSource = getCraftingDataSource();

  if (dataSource === "blizzard") {
    return getBlizzardRecipes();
  }

  return getMockRecipes();
}