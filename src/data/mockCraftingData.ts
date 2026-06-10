import type { InventoryItem, Recipe } from "@/types/crafting";

export const mockInventory: InventoryItem[] = [
  {
    itemId: "cobalt-bar",
    name: "Barra de Cobalto",
    quantity: 10,
  },
  {
    itemId: "heavy-leather",
    name: "Couro Pesado",
    quantity: 5,
  },
  {
    itemId: "arcane-dust",
    name: "Pó Arcano",
    quantity: 12,
  },
  {
    itemId: "green-herb",
    name: "Erva Verde",
    quantity: 100,
  },
];

export const mockRecipes: Recipe[] = [
  {
    id: "great-cobalt-sword",
    name: "Espada Grande de Cobalto",
    profession: "Ferraria",
    craftedItemType: "Arma",
    reagents: [
      {
        itemId: "cobalt-bar",
        name: "Barra de Cobalto",
        quantity: 5,
      },
      {
        itemId: "heavy-leather",
        name: "Couro Pesado",
        quantity: 2,
      },
    ],
  },
  {
    id: "minor-healing-potion",
    name: "Poção Menor de Cura",
    profession: "Alquimia",
    craftedItemType: "Consumível",
    reagents: [
      {
        itemId: "green-herb",
        name: "Erva Verde",
        quantity: 20,
      },
      {
        itemId: "crystal-water",
        name: "Água Cristalina",
        quantity: 5,
      },
    ],
  },
  {
    id: "arcane-cloak",
    name: "Manto Arcano",
    profession: "Alfaiataria",
    craftedItemType: "Armadura",
    reagents: [
      {
        itemId: "arcane-dust",
        name: "Pó Arcano",
        quantity: 6,
      },
      {
        itemId: "silk-cloth",
        name: "Tecido de Seda",
        quantity: 8,
      },
    ],
  },
  {
    id: "cobalt-shield",
    name: "Escudo Reforçado de Cobalto",
    profession: "Ferraria",
    craftedItemType: "Armadura",
    reagents: [
      {
        itemId: "cobalt-bar",
        name: "Barra de Cobalto",
        quantity: 12,
      },
      {
        itemId: "heavy-leather",
        name: "Couro Pesado",
        quantity: 4,
      },
    ],
  },
  {
    id: "herbal-elixir",
    name: "Elixir Herbal",
    profession: "Alquimia",
    craftedItemType: "Consumível",
    reagents: [
      {
        itemId: "green-herb",
        name: "Erva Verde",
        quantity: 25,
      },
      {
        itemId: "arcane-dust",
        name: "Pó Arcano",
        quantity: 3,
      },
    ],
  },
];