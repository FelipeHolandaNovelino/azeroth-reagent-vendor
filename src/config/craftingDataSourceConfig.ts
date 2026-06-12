export type CraftingDataSource = "mock" | "blizzard";

const DEFAULT_CRAFTING_DATA_SOURCE: CraftingDataSource = "mock";

function isCraftingDataSource(value: string): value is CraftingDataSource {
  return value === "mock" || value === "blizzard";
}

export function getCraftingDataSource(): CraftingDataSource {
  const dataSource =
    process.env.CRAFTING_DATA_SOURCE ?? DEFAULT_CRAFTING_DATA_SOURCE;

  if (!isCraftingDataSource(dataSource)) {
    throw new Error(
      `Invalid CRAFTING_DATA_SOURCE value: ${dataSource}. Expected "mock" or "blizzard".`
    );
  }

  return dataSource;
}