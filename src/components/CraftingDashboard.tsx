"use client";

import { useMemo, useState } from "react";

import { CraftSummary } from "@/components/CraftSummary";
import { InventoryGrid } from "@/components/InventoryGrid";
import {
  RecipeFilters,
  type RecipeStatusFilter,
} from "@/components/RecipeFilters";
import { RecipesResult } from "@/components/RecipesResult";
import { mockInventory, mockRecipes } from "@/data/mockCraftingData";
import { calculateCraftOptions } from "@/lib/crafting/calculateCraftOptions";
import type { InventoryItem } from "@/types/crafting";

export function CraftingDashboard() {
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] =
    useState<RecipeStatusFilter>("all");
  const [selectedProfession, setSelectedProfession] = useState("all");

  const craftOptions = useMemo(() => {
    return calculateCraftOptions(inventory, mockRecipes);
  }, [inventory]);

  const filteredCraftOptions = useMemo(() => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    return craftOptions.filter((craftOption) => {
      const matchesSearchTerm =
        normalizedSearchTerm.length === 0 ||
        craftOption.recipeName.toLowerCase().includes(normalizedSearchTerm) ||
        craftOption.profession.toLowerCase().includes(normalizedSearchTerm) ||
        craftOption.craftedItemType.toLowerCase().includes(normalizedSearchTerm) ||
        craftOption.reagents.some((reagent) =>
          reagent.name.toLowerCase().includes(normalizedSearchTerm)
        );

      const matchesStatus =
        selectedStatus === "all" || craftOption.status === selectedStatus;

      const matchesProfession =
        selectedProfession === "all" ||
        craftOption.profession === selectedProfession;

      return matchesSearchTerm && matchesStatus && matchesProfession;
    });
  }, [craftOptions, searchTerm, selectedProfession, selectedStatus]);

  const professions = useMemo(() => {
    // Mantém a lista de profissões única e ordenada para alimentar o select de filtros.
    return Array.from(
      new Set(craftOptions.map((craftOption) => craftOption.profession))
    ).sort((firstProfession, secondProfession) =>
      firstProfession.localeCompare(secondProfession)
    );
  }, [craftOptions]);

  const craftableCount = craftOptions.filter(
    (option) => option.status === "craftable"
  ).length;

  const almostCraftableCount = craftOptions.filter(
    (option) => option.status === "almost"
  ).length;

  function handleInventoryQuantityChange(itemId: string, quantity: number) {
    const safeQuantity = Math.max(quantity, 0);

    // Mantém o inventário imutável para garantir uma atualização previsível do React.
    setInventory((currentInventory) =>
      currentInventory.map((item) => {
        if (item.itemId !== itemId) {
          return item;
        }

        return {
          ...item,
          quantity: safeQuantity,
        };
      })
    );
  }

  function handleResetInventory() {
    // Restaura os dados fictícios para facilitar testes durante o desenvolvimento.
    setInventory(mockInventory);
  }

  function handleClearFilters() {
    setSearchTerm("");
    setSelectedStatus("all");
    setSelectedProfession("all");
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

        <RecipeFilters
          searchTerm={searchTerm}
          selectedStatus={selectedStatus}
          selectedProfession={selectedProfession}
          professions={professions}
          totalResults={filteredCraftOptions.length}
          onSearchTermChange={setSearchTerm}
          onSelectedStatusChange={setSelectedStatus}
          onSelectedProfessionChange={setSelectedProfession}
          onClearFilters={handleClearFilters}
        />

        <RecipesResult craftOptions={filteredCraftOptions} />
      </section>
    </main>
  );
}