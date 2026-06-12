import { afterEach, describe, expect, it } from "vitest";

import { getCraftingDataSource } from "@/config/craftingDataSourceConfig";

const originalCraftingDataSource = process.env.CRAFTING_DATA_SOURCE;

function setCraftingDataSource(value: string | undefined) {
  if (value === undefined) {
    delete process.env.CRAFTING_DATA_SOURCE;
    return;
  }

  process.env.CRAFTING_DATA_SOURCE = value;
}

describe("craftingDataSourceConfig", () => {
  afterEach(() => {
    setCraftingDataSource(originalCraftingDataSource);
  });

  it("returns mock as the default data source when no environment value is defined", () => {
    setCraftingDataSource(undefined);

    const result = getCraftingDataSource();

    expect(result).toBe("mock");
  });

  it("returns mock when CRAFTING_DATA_SOURCE is set to mock", () => {
    setCraftingDataSource("mock");

    const result = getCraftingDataSource();

    expect(result).toBe("mock");
  });

  it("returns blizzard when CRAFTING_DATA_SOURCE is set to blizzard", () => {
    setCraftingDataSource("blizzard");

    const result = getCraftingDataSource();

    expect(result).toBe("blizzard");
  });

  it("throws a clear error when CRAFTING_DATA_SOURCE has an invalid value", () => {
    setCraftingDataSource("invalid-source");

    expect(() => getCraftingDataSource()).toThrow(
      'Invalid CRAFTING_DATA_SOURCE value: invalid-source. Expected "mock" or "blizzard".'
    );
  });
});