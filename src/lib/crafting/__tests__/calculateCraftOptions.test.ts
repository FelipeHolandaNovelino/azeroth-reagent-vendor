import { describe, expect, it } from "vitest";

import { calculateCraftOptions } from "@/lib/crafting/calculateCraftOptions";
import type { InventoryItem, Recipe } from "@/types/crafting";

const recipes: Recipe[] = [
  {
    id: "cobalt-sword",
    name: "Espada de Cobalto",
    profession: "Ferraria",
    craftedItemType: "Arma",
    reagents: [
      {
        itemId: "cobalt-bar",
        name: "Barra de Cobalto",
        quantity: 5,
      },
      {
        itemId: "heavy-leather",
        name: "Couro Pesado",
        quantity: 2,
      },
    ],
  },
  {
    id: "healing-potion",
    name: "Poção de Cura",
    profession: "Alquimia",
    craftedItemType: "Consumível",
    reagents: [
      {
        itemId: "green-herb",
        name: "Erva Verde",
        quantity: 20,
      },
      {
        itemId: "crystal-water",
        name: "Água Cristalina",
        quantity: 5,
      },
    ],
  },
];

describe("calculateCraftOptions", () => {
  it("marks a recipe as craftable when all reagents are available", () => {
    const inventory: InventoryItem[] = [
      {
        itemId: "cobalt-bar",
        name: "Barra de Cobalto",
        quantity: 10,
      },
      {
        itemId: "heavy-leather",
        name: "Couro Pesado",
        quantity: 4,
      },
    ];

    const result = calculateCraftOptions(inventory, recipes);
    const cobaltSword = result.find(
      (recipe) => recipe.recipeId === "cobalt-sword"
    );

    expect(cobaltSword).toBeDefined();
    expect(cobaltSword?.status).toBe("craftable");
    expect(cobaltSword?.maxCrafts).toBe(2);
    expect(cobaltSword?.missingReagents).toEqual([]);
    expect(cobaltSword?.completionPercentage).toBe(100);
  });

  it("marks a recipe as almost craftable when at least half of the required materials are available", () => {
    const inventory: InventoryItem[] = [
      {
        itemId: "green-herb",
        name: "Erva Verde",
        quantity: 20,
      },
      {
        itemId: "crystal-water",
        name: "Água Cristalina",
        quantity: 0,
      },
    ];

    const result = calculateCraftOptions(inventory, recipes);
    const healingPotion = result.find(
      (recipe) => recipe.recipeId === "healing-potion"
    );

    expect(healingPotion).toBeDefined();
    expect(healingPotion?.status).toBe("almost");
    expect(healingPotion?.maxCrafts).toBe(0);
    expect(healingPotion?.completionPercentage).toBe(80);
    expect(healingPotion?.missingReagents).toEqual([
      {
        itemId: "crystal-water",
        name: "Água Cristalina",
        requiredQuantity: 5,
        ownedQuantity: 0,
        missingQuantity: 5,
      },
    ]);
  });

  it("marks a recipe as unavailable when less than half of the required materials are available", () => {
    const inventory: InventoryItem[] = [
      {
        itemId: "green-herb",
        name: "Erva Verde",
        quantity: 2,
      },
    ];

    const result = calculateCraftOptions(inventory, recipes);
    const healingPotion = result.find(
      (recipe) => recipe.recipeId === "healing-potion"
    );

    expect(healingPotion).toBeDefined();
    expect(healingPotion?.status).toBe("unavailable");
    expect(healingPotion?.maxCrafts).toBe(0);
    expect(healingPotion?.completionPercentage).toBe(8);
  });

  it("returns reagent availability for each recipe material", () => {
    const inventory: InventoryItem[] = [
      {
        itemId: "cobalt-bar",
        name: "Barra de Cobalto",
        quantity: 3,
      },
      {
        itemId: "heavy-leather",
        name: "Couro Pesado",
        quantity: 2,
      },
    ];

    const result = calculateCraftOptions(inventory, recipes);
    const cobaltSword = result.find(
      (recipe) => recipe.recipeId === "cobalt-sword"
    );

    expect(cobaltSword?.reagents).toEqual([
      {
        itemId: "cobalt-bar",
        name: "Barra de Cobalto",
        quantity: 5,
        ownedQuantity: 3,
        missingQuantity: 2,
        isAvailable: false,
      },
      {
        itemId: "heavy-leather",
        name: "Couro Pesado",
        quantity: 2,
        ownedQuantity: 2,
        missingQuantity: 0,
        isAvailable: true,
      },
    ]);
  });

  it("sorts craftable recipes before almost craftable and unavailable recipes", () => {
    const inventory: InventoryItem[] = [
      {
        itemId: "cobalt-bar",
        name: "Barra de Cobalto",
        quantity: 10,
      },
      {
        itemId: "heavy-leather",
        name: "Couro Pesado",
        quantity: 4,
      },
      {
        itemId: "green-herb",
        name: "Erva Verde",
        quantity: 20,
      },
    ];

    const result = calculateCraftOptions(inventory, recipes);

    expect(result[0].recipeId).toBe("cobalt-sword");
    expect(result[0].status).toBe("craftable");
    expect(result[1].recipeId).toBe("healing-potion");
    expect(result[1].status).toBe("almost");
  });
});