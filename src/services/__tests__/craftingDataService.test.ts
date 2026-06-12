import { afterEach, describe, expect, it } from "vitest";

import { mockRecipes } from "@/data/mockCraftingData";
import { getAvailableRecipes } from "@/services/craftingDataService";

const originalCraftingDataSource = process.env.CRAFTING_DATA_SOURCE;

function setCraftingDataSource(value: string | undefined) {
  if (value === undefined) {
    delete process.env.CRAFTING_DATA_SOURCE;
    return;
  }

  process.env.CRAFTING_DATA_SOURCE = value;
}

describe("craftingDataService", () => {
  afterEach(() => {
    setCraftingDataSource(originalCraftingDataSource);
  });

  it("returns mock recipes when no data source is defined", async () => {
    setCraftingDataSource(undefined);

    const result = await getAvailableRecipes();

    expect(result).toEqual(mockRecipes);
  });

  it("returns mock recipes when CRAFTING_DATA_SOURCE is set to mock", async () => {
    setCraftingDataSource("mock");

    const result = await getAvailableRecipes();

    expect(result).toEqual(mockRecipes);
  });

  it("throws a clear error when CRAFTING_DATA_SOURCE is set to blizzard before implementation", async () => {
    setCraftingDataSource("blizzard");

    await expect(getAvailableRecipes()).rejects.toThrow(
      "Blizzard data source is not implemented yet. Use CRAFTING_DATA_SOURCE=mock."
    );
  });
});