"use client";

import { useEffect, useMemo, useState } from "react";

import { CraftSummary } from "@/components/CraftSummary";
import { InventoryGrid } from "@/components/InventoryGrid";
import { InventoryImportExport } from "@/components/InventoryImportExport";
import { RecipeFilters } from "@/components/RecipeFilters";
import { RecipesResult } from "@/components/RecipesResult";
import { useCraftingResults } from "@/hooks/useCraftingResults";
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

  const addableReagents = useMemo(() => {
    const currentInventoryIds = new Set(
      inventory.map((item) => item.itemId)
    );

    return reagentCatalog.filter(
      (reagent) => !currentInventoryIds.has(reagent.itemId)
    );
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
    <main className="min-h-screen bg-slate-950 px-6 py-8 text-slate-100">
      <section className="mx-auto flex max-w-6xl flex-col gap-8">
        <CraftSummary
          craftableCount={craftableCount}
          almostCraftableCount={almostCraftableCount}
        />

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