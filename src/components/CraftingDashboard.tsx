"use client";

import { useEffect, useMemo, useState } from "react";

import { CraftSummary } from "@/components/CraftSummary";
import { CraftingFlow } from "@/components/CraftingFlow";
import { InventoryGrid } from "@/components/InventoryGrid";
import { InventoryImportExport } from "@/components/InventoryImportExport";
import { RecipeFilters } from "@/components/RecipeFilters";
import { RecipesResult } from "@/components/RecipesResult";
import {
  useCraftingResults,
  type ReagentCatalogItem,
} from "@/hooks/useCraftingResults";
import { useInventory } from "@/hooks/useInventory";

export function CraftingDashboard() {
  const {
    inventory,
    updateInventoryQuantity,
    addInventoryItem,
    removeInventoryItem,
    replaceInventory,
    resetInventory,
  } = useInventory();

  const {
    searchTerm,
    selectedStatus,
    selectedProfession,
    filteredCraftOptions,
    professions,
    reagentCatalog,
    craftableCount,
    almostCraftableCount,
    setSearchTerm,
    setSelectedStatus,
    setSelectedProfession,
    clearFilters,
  } = useCraftingResults(inventory);

  const [selectedReagentId, setSelectedReagentId] = useState("");

  const addableReagents = useMemo<ReagentCatalogItem[]>(() => {
    const currentInventoryIds = new Set<string>(
      inventory.map((item) => item.itemId)
    );

    // Exibe apenas reagentes usados por receitas e que ainda não estão no inventário.
    return reagentCatalog.filter((reagent: ReagentCatalogItem) => {
      return !currentInventoryIds.has(reagent.itemId);
    });
  }, [inventory, reagentCatalog]);

  useEffect(() => {
    if (addableReagents.length === 0) {
      setSelectedReagentId("");
      return;
    }

    const selectedReagentStillAvailable = addableReagents.some(
      (reagent) => reagent.itemId === selectedReagentId
    );

    if (!selectedReagentStillAvailable) {
      setSelectedReagentId(addableReagents[0].itemId);
    }
  }, [addableReagents, selectedReagentId]);

  function handleAddInventoryItem() {
    const selectedReagent = reagentCatalog.find(
      (reagent) => reagent.itemId === selectedReagentId
    );

    if (!selectedReagent) {
      return;
    }

    // Novo reagente começa com 1 unidade para participar imediatamente dos cálculos.
    addInventoryItem({
      itemId: selectedReagent.itemId,
      name: selectedReagent.name,
      quantity: 1,
    });
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#1a130e] px-4 py-6 text-[#f3e7c3] sm:px-6 sm:py-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#d4a64a22,transparent_30%),radial-gradient(circle_at_80%_20%,#3b82f622,transparent_25%),radial-gradient(circle_at_10%_80%,#7c5b2b22,transparent_30%)]" />
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[#d4a64a]/10 blur-3xl" />
        <div className="absolute right-0 top-72 h-[28rem] w-[28rem] rounded-full bg-[#355c8c]/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[28rem] w-[28rem] rounded-full bg-[#6b4d2a]/10 blur-3xl" />
      </div>

      <section className="relative mx-auto flex max-w-6xl flex-col gap-8">
        <CraftSummary
          craftableCount={craftableCount}
          almostCraftableCount={almostCraftableCount}
        />

        <CraftingFlow />

        <InventoryGrid
          items={inventory}
          addableReagents={addableReagents}
          selectedReagentId={selectedReagentId}
          onSelectedReagentChange={setSelectedReagentId}
          onAddInventoryItem={handleAddInventoryItem}
          onQuantityChange={updateInventoryQuantity}
          onRemoveInventoryItem={removeInventoryItem}
          onResetInventory={resetInventory}
        />

        <InventoryImportExport
          inventory={inventory}
          onImportInventory={replaceInventory}
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
          onClearFilters={clearFilters}
        />

        <RecipesResult craftOptions={filteredCraftOptions} />
      </section>
    </main>
  );
}