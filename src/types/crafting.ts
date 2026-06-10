export type RecipeStatus = "craftable" | "almost" | "unavailable";

export type InventoryItem = {
  itemId: string;
  name: string;
  quantity: number;
};

export type ReagentRequirement = {
  itemId: string;
  name: string;
  quantity: number;
};

export type Recipe = {
  id: string;
  name: string;
  profession: string;
  craftedItemType: string;
  reagents: ReagentRequirement[];
};

export type MissingReagent = {
  itemId: string;
  name: string;
  requiredQuantity: number;
  ownedQuantity: number;
  missingQuantity: number;
};

export type CraftOption = {
  recipeId: string;
  recipeName: string;
  profession: string;
  craftedItemType: string;
  status: RecipeStatus;
  maxCrafts: number;
  completionPercentage: number;
  reagents: ReagentRequirement[];
  missingReagents: MissingReagent[];
};