"use client";

import { useMemo, useState } from "react";

import { calculateCraftOptions } from "@/lib/crafting/calculateCraftOptions";
import { getAvailableRecipes } from "@/services/craftingDataService";
import type {
  InventoryItem,
  RecipeStatusFilter,
} from "@/types/crafting";

export type ReagentCatalogItem = Pick<InventoryItem, "itemId" | "name">;

export function useCraftingResults(inventory: InventoryItem[]) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] =
    useState<RecipeStatusFilter>("all");
  const [selectedProfession, setSelectedProfession] = useState("all");

  const availableRecipes = useMemo(() => {
    // Mantém a origem das receitas isolada para permitir futura integração com API externa.
    return getAvailableRecipes();
  }, []);

  const craftOptions = useMemo(() => {
    return calculateCraftOptions(inventory, availableRecipes);
  }, [inventory, availableRecipes]);

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
    // Mantém a lista de profissões única e ordenada para alimentar o filtro visual.
    return Array.from(
      new Set(craftOptions.map((craftOption) => craftOption.profession))
    ).sort((firstProfession, secondProfession) =>
      firstProfession.localeCompare(secondProfession)
    );
  }, [craftOptions]);

  const reagentCatalog = useMemo<ReagentCatalogItem[]>(() => {
    const reagentsMap = new Map<string, ReagentCatalogItem>();

    // O catálogo nasce das receitas disponíveis para garantir que só reagentes úteis sejam adicionados.
    availableRecipes.forEach((recipe) => {
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
  }, [availableRecipes]);

  const craftableCount = useMemo(() => {
    return craftOptions.filter((option) => option.status === "craftable")
      .length;
  }, [craftOptions]);

  const almostCraftableCount = useMemo(() => {
    return craftOptions.filter((option) => option.status === "almost").length;
  }, [craftOptions]);

  function clearFilters() {
    setSearchTerm("");
    setSelectedStatus("all");
    setSelectedProfession("all");
  }

  return {
    searchTerm,
    selectedStatus,
    selectedProfession,
    craftOptions,
    filteredCraftOptions,
    professions,
    reagentCatalog,
    craftableCount,
    almostCraftableCount,
    setSearchTerm,
    setSelectedStatus,
    setSelectedProfession,
    clearFilters,
  };
}