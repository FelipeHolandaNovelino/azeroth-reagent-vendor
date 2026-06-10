import { CraftSummary } from "@/components/CraftSummary";
import { InventoryGrid } from "@/components/InventoryGrid";
import { RecipesResult } from "@/components/RecipesResult";
import { mockInventory, mockRecipes } from "@/data/mockCraftingData";
import { calculateCraftOptions } from "@/lib/crafting/calculateCraftOptions";

export default function Home() {
  const craftOptions = calculateCraftOptions(mockInventory, mockRecipes);

  const craftableCount = craftOptions.filter(
    (option) => option.status === "craftable"
  ).length;

  const almostCraftableCount = craftOptions.filter(
    (option) => option.status === "almost"
  ).length;

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8 text-slate-100">
      <section className="mx-auto flex max-w-6xl flex-col gap-8">
        <CraftSummary
          craftableCount={craftableCount}
          almostCraftableCount={almostCraftableCount}
        />

        <InventoryGrid items={mockInventory} />

        <RecipesResult craftOptions={craftOptions} />
      </section>
    </main>
  );
}