import type {
  CraftOption,
  InventoryItem,
  MissingReagent,
  Recipe,
  RecipeReagentAvailability,
  RecipeStatus,
} from "@/types/crafting";

function getRecipeStatus(
  missingReagents: MissingReagent[],
  completionPercentage: number
): RecipeStatus {
  if (missingReagents.length === 0) {
    return "craftable";
  }

  if (completionPercentage >= 50) {
    return "almost";
  }

  return "unavailable";
}

function calculateCompletionPercentage(
  recipe: Recipe,
  inventoryMap: Map<string, InventoryItem>
): number {
  const totalRequiredQuantity = recipe.reagents.reduce(
    (total, reagent) => total + reagent.quantity,
    0
  );

  const totalOwnedUsefulQuantity = recipe.reagents.reduce((total, reagent) => {
    const ownedQuantity = inventoryMap.get(reagent.itemId)?.quantity ?? 0;
    const usefulQuantity = Math.min(ownedQuantity, reagent.quantity);

    return total + usefulQuantity;
  }, 0);

  if (totalRequiredQuantity === 0) {
    return 0;
  }

  return Math.round((totalOwnedUsefulQuantity / totalRequiredQuantity) * 100);
}

function calculateMaxCrafts(
  recipe: Recipe,
  inventoryMap: Map<string, InventoryItem>
): number {
  const craftLimits = recipe.reagents.map((reagent) => {
    const ownedQuantity = inventoryMap.get(reagent.itemId)?.quantity ?? 0;

    return Math.floor(ownedQuantity / reagent.quantity);
  });

  return Math.min(...craftLimits);
}

function getRecipeReagentsAvailability(
  recipe: Recipe,
  inventoryMap: Map<string, InventoryItem>
): RecipeReagentAvailability[] {
  return recipe.reagents.map((reagent) => {
    const ownedQuantity = inventoryMap.get(reagent.itemId)?.quantity ?? 0;
    const missingQuantity = Math.max(reagent.quantity - ownedQuantity, 0);

    return {
      ...reagent,
      ownedQuantity,
      missingQuantity,
      isAvailable: missingQuantity === 0,
    };
  });
}

function getMissingReagents(
  reagentsAvailability: RecipeReagentAvailability[]
): MissingReagent[] {
  return reagentsAvailability
    .filter((reagent) => reagent.missingQuantity > 0)
    .map((reagent) => {
      return {
        itemId: reagent.itemId,
        name: reagent.name,
        requiredQuantity: reagent.quantity,
        ownedQuantity: reagent.ownedQuantity,
        missingQuantity: reagent.missingQuantity,
      };
    });
}

function getStatusPriority(status: RecipeStatus): number {
  const priorityByStatus: Record<RecipeStatus, number> = {
    craftable: 1,
    almost: 2,
    unavailable: 3,
  };

  return priorityByStatus[status];
}

export function calculateCraftOptions(
  inventory: InventoryItem[],
  recipes: Recipe[]
): CraftOption[] {
  const inventoryMap = new Map(inventory.map((item) => [item.itemId, item]));

  const craftOptions = recipes.map((recipe) => {
    const reagentsAvailability = getRecipeReagentsAvailability(
      recipe,
      inventoryMap
    );

    const missingReagents = getMissingReagents(reagentsAvailability);

    const completionPercentage = calculateCompletionPercentage(
      recipe,
      inventoryMap
    );

    const status = getRecipeStatus(missingReagents, completionPercentage);

    const maxCrafts =
      status === "craftable" ? calculateMaxCrafts(recipe, inventoryMap) : 0;

    return {
      recipeId: recipe.id,
      recipeName: recipe.name,
      profession: recipe.profession,
      craftedItemType: recipe.craftedItemType,
      status,
      maxCrafts,
      completionPercentage,
      reagents: reagentsAvailability,
      missingReagents,
    };
  });

  // Mantém os resultados mais úteis no topo: craftáveis, quase craftáveis e indisponíveis.
  return craftOptions.sort((firstRecipe, secondRecipe) => {
    const statusDifference =
      getStatusPriority(firstRecipe.status) -
      getStatusPriority(secondRecipe.status);

    if (statusDifference !== 0) {
      return statusDifference;
    }

    return secondRecipe.completionPercentage - firstRecipe.completionPercentage;
  });
}