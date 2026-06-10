"use client";

import { useEffect, useMemo, useState } from "react";

import { CraftSummary } from "@/components/CraftSummary";
import { InventoryGrid } from "@/components/InventoryGrid";
import {
  RecipeFilters,
  type RecipeStatusFilter,
} from "@/components/RecipeFilters";
import { RecipesResult } from "@/components/RecipesResult";
import { mockRecipes } from "@/data/mockCraftingData";
import { useInventory } from "@/hooks/useInventory";
import { calculateCraftOptions } from "@/lib/crafting/calculateCraftOptions";
import type { InventoryItem } from "@/types/crafting";

type ReagentCatalogItem = Pick<InventoryItem, "itemId" | "name">;

export function CraftingDashboard() {
  const {
    inventory,
    updateInventoryQuantity,
    addInventoryItem,
    removeInventoryItem,
    resetInventory,
  } = useInventory();

  const [selectedReagentId, setSelectedReagentId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] =
    useState<RecipeStatusFilter>("all");
  const [selectedProfession, setSelectedProfession] = useState("all");

  const reagentCatalog = useMemo<ReagentCatalogItem[]>(() => {
    const reagentsMap = new Map<string, ReagentCatalogItem>();

    // Cria um catálogo único a partir dos reagentes usados nas receitas disponíveis.
    mockRecipes.forEach((recipe) => {
      recipe.reagents.forEach((reagent) => {
        reagentsMap.set(reagent.itemId, {
          itemId: reagent.itemId,
          name: reagent.name,
        });
      });
    });

    return Array.from(reagentsMap.values()).sort((firstReagent, secondReagent) =>
      firstReagent.name.localeCompare(secondReagent.name)
    );
  }, []);

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
        craftOption.craftedItemType
          .toLowerCase()
          .includes(normalizedSearchTerm) ||
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
    // Mantém a lista de profissões única e ordenada para alimentar o filtro.
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
          addableReagents={addableReagents}
          selectedReagentId={selectedReagentId}
          onSelectedReagentChange={setSelectedReagentId}
          onAddInventoryItem={handleAddInventoryItem}
          onQuantityChange={updateInventoryQuantity}
          onRemoveInventoryItem={removeInventoryItem}
          onResetInventory={resetInventory}
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