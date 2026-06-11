"use client";

import { useEffect, useState } from "react";

import { mockInventory } from "@/data/mockCraftingData";
import type { InventoryItem } from "@/types/crafting";

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

    // Valida o formato mínimo dos dados salvos para evitar quebrar o cálculo de crafting.
    return parsedInventory.filter((item): item is InventoryItem => {
      return (
        typeof item?.itemId === "string" &&
        typeof item?.name === "string" &&
        typeof item?.quantity === "number"
      );
    });
  } catch {
    // Mantém o app funcional mesmo se o localStorage estiver bloqueado ou corrompido.
    return mockInventory;
  }
}

export function useInventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory);
  const [hasLoadedStoredInventory, setHasLoadedStoredInventory] =
    useState(false);

  useEffect(() => {
    setInventory(loadStoredInventory());
    setHasLoadedStoredInventory(true);
  }, []);

  useEffect(() => {
    if (!hasLoadedStoredInventory) {
      return;
    }

    // Persiste qualquer alteração feita pelo jogador: adicionar, remover, importar ou editar quantidade.
    window.localStorage.setItem(
      INVENTORY_STORAGE_KEY,
      JSON.stringify(inventory)
    );
  }, [hasLoadedStoredInventory, inventory]);

  function updateInventoryQuantity(itemId: string, quantity: number) {
    const safeQuantity = Math.max(quantity, 0);

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

  function addInventoryItem(item: InventoryItem) {
    setInventory((currentInventory) => {
      const itemAlreadyExists = currentInventory.some(
        (currentItem) => currentItem.itemId === item.itemId
      );

      if (itemAlreadyExists) {
        return currentInventory;
      }

      return [...currentInventory, item];
    });
  }

  function removeInventoryItem(itemId: string) {
    setInventory((currentInventory) =>
      currentInventory.filter((item) => item.itemId !== itemId)
    );
  }

  function replaceInventory(items: InventoryItem[]) {
    // Substitui o inventário inteiro, usado principalmente no fluxo de importação por JSON.
    setInventory(items);
  }

  function resetInventory() {
    setInventory(mockInventory);
  }

  return {
    inventory,
    updateInventoryQuantity,
    addInventoryItem,
    removeInventoryItem,
    replaceInventory,
    resetInventory,
  };
}