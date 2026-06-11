import { describe, expect, it } from "vitest";

import {
  adaptBlizzardRecipeToRecipe,
  adaptBlizzardRecipesToRecipes,
  type BlizzardRecipeSource,
} from "@/adapters/blizzardRecipeAdapter";

describe("blizzardRecipeAdapter", () => {
  it("adapts a Blizzard recipe source to the internal Recipe format", () => {
    const blizzardRecipe: BlizzardRecipeSource = {
      id: 12345,
      name: "Espada Grande de Cobalto",
      professionName: "Ferraria",
      craftedItemType: "Arma",
      reagents: [
        {
          id: 100,
          name: "Barra de Cobalto",
          quantity: 5,
        },
        {
          id: 200,
          name: "Couro Pesado",
          quantity: 2,
        },
      ],
    };

    const result = adaptBlizzardRecipeToRecipe(blizzardRecipe);

    expect(result).toEqual({
      id: "12345",
      name: "Espada Grande de Cobalto",
      profession: "Ferraria",
      craftedItemType: "Arma",
      reagents: [
        {
          itemId: "100",
          name: "Barra de Cobalto",
          quantity: 5,
        },
        {
          itemId: "200",
          name: "Couro Pesado",
          quantity: 2,
        },
      ],
    });
  });

  it("adapts multiple Blizzard recipe sources", () => {
    const blizzardRecipes: BlizzardRecipeSource[] = [
      {
        id: 1,
        name: "Poção Menor de Cura",
        professionName: "Alquimia",
        craftedItemType: "Consumível",
        reagents: [
          {
            id: 10,
            name: "Erva Verde",
            quantity: 20,
          },
        ],
      },
      {
        id: 2,
        name: "Manto Arcano",
        professionName: "Alfaiataria",
        craftedItemType: "Armadura",
        reagents: [
          {
            id: 30,
            name: "Pó Arcano",
            quantity: 6,
          },
        ],
      },
    ];

    const result = adaptBlizzardRecipesToRecipes(blizzardRecipes);

    expect(result).toHaveLength(2);
    expect(result[0].id).toBe("1");
    expect(result[0].reagents[0].itemId).toBe("10");
    expect(result[1].profession).toBe("Alfaiataria");
  });
});