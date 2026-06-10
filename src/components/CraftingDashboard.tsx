"use client";

import { useEffect, useMemo, useState } from "react";

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

type ReagentCatalogItem = Pick<InventoryItem, "itemId" | "name">;

const INVENTORY_STORAGE_KEY = "azeroth-reagent-vendor:inventory";

function loadStoredInventory(): InventoryItem[] {
  try {
    const storedInventory = window.localStorage.getItem(INVENTORY_STORAGE_KEY);

    if (!storedInventory) {
      return mockInventory;
    }

    const parsedInventory = JSON.parse(storedInventory);

    if (!Array.isArray(parsedInventory)) {
      return mockInventory;
    }

    // Garante que dados salvos no navegador tenham o formato mínimo esperado.
    return parsedInventory.filter((item): item is InventoryItem => {
      return (
        typeof item?.itemId === "string" &&
        typeof item?.name === "string" &&
        typeof item?.quantity === "number"
      );
    });
  } catch {
    // Em caso de JSON inválido ou bloqueio do localStorage, o app continua funcional.
    return mockInventory;
  }
}

export function CraftingDashboard() {
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory);
  const [hasLoadedStoredInventory, setHasLoadedStoredInventory] =
    useState(false);
  const [selectedReagentId, setSelectedReagentId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] =
    useState<RecipeStatusFilter>("all");
  const [selectedProfession, setSelectedProfession] = useState("all");

  useEffect(() => {
    setInventory(loadStoredInventory());
    setHasLoadedStoredInventory(true);
  }, []);

  useEffect(() => {
    if (!hasLoadedStoredInventory) {
      return;
    }

    // Persiste o inventário sempre que o jogador adiciona, remove ou altera quantidades.
    window.localStorage.setItem(
      INVENTORY_STORAGE_KEY,
      JSON.stringify(inventory)
    );
  }, [hasLoadedStoredInventory, inventory]);

  const reagentCatalog = useMemo<ReagentCatalogItem[]>(() => {
    const reagentsMap = new Map<string, ReagentCatalogItem>();

    // Monta um catálogo único a partir dos reagentes usados nas receitas mockadas.
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

  function handleAddInventoryItem() {
    const selectedReagent = reagentCatalog.find(
      (reagent) => reagent.itemId === selectedReagentId
    );

    if (!selectedReagent) {
      return;
    }

    // Novo reagente começa com quantidade 1 para já participar do cálculo.
    setInventory((currentInventory) => [
      ...currentInventory,
      {
        itemId: selectedReagent.itemId,
        name: selectedReagent.name,
        quantity: 1,
      },
    ]);
  }

  function handleRemoveInventoryItem(itemId: string) {
    setInventory((currentInventory) =>
      currentInventory.filter((item) => item.itemId !== itemId)
    );
  }

  function handleResetInventory() {
    // Restaura os dados fictícios e deixa o localStorage sincronizado pelo efeito de persistência.
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
          addableReagents={addableReagents}
          selectedReagentId={selectedReagentId}
          onSelectedReagentChange={setSelectedReagentId}
          onAddInventoryItem={handleAddInventoryItem}
          onQuantityChange={handleInventoryQuantityChange}
          onRemoveInventoryItem={handleRemoveInventoryItem}
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