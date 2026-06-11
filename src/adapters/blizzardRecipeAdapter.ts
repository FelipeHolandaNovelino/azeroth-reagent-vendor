import type { Recipe } from "@/types/crafting";

export type BlizzardRecipeReagentSource = {
  id: number;
  name: string;
  quantity: number;
};

export type BlizzardRecipeSource = {
  id: number;
  name: string;
  professionName: string;
  craftedItemType: string;
  reagents: BlizzardRecipeReagentSource[];
};

export function adaptBlizzardRecipeToRecipe(
  blizzardRecipe: BlizzardRecipeSource
): Recipe {
  // Mantém o domínio interno independente do formato externo da Blizzard API.
  return {
    id: String(blizzardRecipe.id),
    name: blizzardRecipe.name,
    profession: blizzardRecipe.professionName,
    craftedItemType: blizzardRecipe.craftedItemType,
    reagents: blizzardRecipe.reagents.map((reagent) => {
      return {
        itemId: String(reagent.id),
        name: reagent.name,
        quantity: reagent.quantity,
      };
    }),
  };
}

export function adaptBlizzardRecipesToRecipes(
  blizzardRecipes: BlizzardRecipeSource[]
): Recipe[] {
  return blizzardRecipes.map(adaptBlizzardRecipeToRecipe);
}