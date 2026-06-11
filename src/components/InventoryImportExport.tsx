"use client";

import { useMemo, useState } from "react";

import type { InventoryItem } from "@/types/crafting";

type InventoryImportExportProps = {
  inventory: InventoryItem[];
  onImportInventory: (items: InventoryItem[]) => void;
};

type FeedbackType = "success" | "error";

type FeedbackMessage = {
  type: FeedbackType;
  text: string;
};

function normalizeImportedInventory(value: unknown): InventoryItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const inventoryMap = new Map<string, InventoryItem>();

  value.forEach((item) => {
    const hasValidShape =
      typeof item?.itemId === "string" &&
      typeof item?.name === "string" &&
      typeof item?.quantity === "number" &&
      Number.isFinite(item.quantity);

    if (!hasValidShape) {
      return;
    }

    const safeQuantity = Math.max(Math.floor(item.quantity), 0);
    const existingItem = inventoryMap.get(item.itemId);

    // Une itens duplicados para evitar inconsistência no cálculo de receitas.
    if (existingItem) {
      inventoryMap.set(item.itemId, {
        ...existingItem,
        quantity: existingItem.quantity + safeQuantity,
      });

      return;
    }

    inventoryMap.set(item.itemId, {
      itemId: item.itemId,
      name: item.name,
      quantity: safeQuantity,
    });
  });

  return Array.from(inventoryMap.values());
}

export function InventoryImportExport({
  inventory,
  onImportInventory,
}: InventoryImportExportProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [importValue, setImportValue] = useState("");
  const [feedbackMessage, setFeedbackMessage] =
    useState<FeedbackMessage | null>(null);

  const exportedInventory = useMemo(() => {
    return JSON.stringify(inventory, null, 2);
  }, [inventory]);

  async function handleCopyInventory() {
    try {
      await window.navigator.clipboard.writeText(exportedInventory);

      setFeedbackMessage({
        type: "success",
        text: "Inventário copiado para a área de transferência.",
      });
    } catch {
      setFeedbackMessage({
        type: "error",
        text: "Não foi possível copiar automaticamente. Selecione e copie o JSON manualmente.",
      });
    }
  }

  function handleImportInventory() {
    try {
      const parsedInventory = JSON.parse(importValue);
      const normalizedInventory = normalizeImportedInventory(parsedInventory);

      if (normalizedInventory.length === 0) {
        setFeedbackMessage({
          type: "error",
          text: "Nenhum reagente válido foi encontrado no JSON informado.",
        });

        return;
      }

      onImportInventory(normalizedInventory);
      setImportValue("");

      setFeedbackMessage({
        type: "success",
        text: "Inventário importado com sucesso.",
      });
    } catch {
      setFeedbackMessage({
        type: "error",
        text: "O conteúdo informado não é um JSON válido.",
      });
    }
  }

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Importação
          </p>

          <h2 className="mt-1 text-xl font-bold text-white">
            Importar ou exportar inventário
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Use JSON para salvar, compartilhar ou simular uma futura importação
            gerada por AddOn.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((currentValue) => !currentValue)}
          className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-amber-300 hover:text-amber-200"
        >
          {isOpen ? "Ocultar ferramentas" : "Mostrar ferramentas"}
        </button>
      </div>

      {isOpen && (
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-sm font-bold text-white">
                Exportar inventário atual
              </h3>

              <button
                type="button"
                onClick={handleCopyInventory}
                className="rounded-xl bg-amber-300 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-amber-200"
              >
                Copiar JSON
              </button>
            </div>

            <pre className="mt-4 max-h-72 overflow-auto rounded-xl border border-slate-800 bg-slate-900 p-3 text-xs leading-5 text-slate-300">
              {exportedInventory}
            </pre>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-sm font-bold text-white">
              Importar inventário
            </h3>

            <textarea
              value={importValue}
              onChange={(event) => setImportValue(event.target.value)}
              placeholder='Cole aqui um JSON como: [{"itemId":"green-herb","name":"Erva Verde","quantity":100}]'
              className="mt-4 min-h-72 w-full resize-y rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm leading-6 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-300"
            />

            <button
              type="button"
              onClick={handleImportInventory}
              className="mt-3 w-full rounded-xl bg-amber-300 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-amber-200"
            >
              Importar JSON
            </button>
          </div>
        </div>
      )}

      {feedbackMessage && (
        <p
          className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
            feedbackMessage.type === "success"
              ? "border-emerald-400/40 bg-emerald-950/30 text-emerald-100"
              : "border-red-400/40 bg-red-950/30 text-red-100"
          }`}
        >
          {feedbackMessage.text}
        </p>
      )}
    </section>
  );
}