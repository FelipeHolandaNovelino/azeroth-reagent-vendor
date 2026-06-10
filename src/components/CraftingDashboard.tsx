"use client";

import { useMemo, useState } from "react";

import { CraftSummary } from "@/components/CraftSummary";
import { InventoryGrid } from "@/components/InventoryGrid";
import { RecipesResult } from "@/components/RecipesResult";
import { mockInventory, mockRecipes } from "@/data/mockCraftingData";
import { calculateCraftOptions } from "@/lib/crafting/calculateCraftOptions";
import type { InventoryItem } from "@/types/crafting";

export function CraftingDashboard() {
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory);

  const craftOptions = useMemo(() => {
    return calculateCraftOptions(inventory, mockRecipes);
  }, [inventory]);

  const craftableCount = craftOptions.filter(
    (option) => option.status === "craftable"
  ).length;

  const almostCraftableCount = craftOptions.filter(
    (option) => option.status === "almost"
  ).length;

  function handleInventoryQuantityChange(itemId: string, quantity: number) {
    // Mantém o inventário imutável para garantir uma atualização previsível do React.
    setInventory((currentInventory) =>
      currentInventory.map((item) => {
        if (item.itemId !== itemId) {
          return item;
        }

        return {
          ...item,
          quantity,
        };
      })
    );
  }

  function handleResetInventory() {
    // Restaura os dados fictícios para facilitar testes durante o desenvolvimento.
    setInventory(mockInventory);
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8 text-slate-100">
      <section className="mx-auto flex max-w-6xl flex-col gap-8">
        <CraftSummary
          craftableCount={craftableCount}
          almostCraftableCount={almostCraftableCount}
        />

        <InventoryGrid
          items={inventory}
          onQuantityChange={handleInventoryQuantityChange}
          onResetInventory={handleResetInventory}
        />

        <RecipesResult craftOptions={craftOptions} />
      </section>
    </main>
  );
}