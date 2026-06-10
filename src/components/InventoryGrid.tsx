import type { InventoryItem } from "@/types/crafting";

type ReagentCatalogItem = Pick<InventoryItem, "itemId" | "name">;

type InventoryGridProps = {
  items: InventoryItem[];
  addableReagents: ReagentCatalogItem[];
  selectedReagentId: string;
  onSelectedReagentChange: (itemId: string) => void;
  onAddInventoryItem: () => void;
  onQuantityChange: (itemId: string, quantity: number) => void;
  onRemoveInventoryItem: (itemId: string) => void;
  onResetInventory: () => void;
};

export function InventoryGrid({
  items,
  addableReagents,
  selectedReagentId,
  onSelectedReagentChange,
  onAddInventoryItem,
  onQuantityChange,
  onRemoveInventoryItem,
  onResetInventory,
}: InventoryGridProps) {
  const hasAddableReagents = addableReagents.length > 0;

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">
            Reagentes informados
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Monte seu inventário manualmente e veja as receitas serem
            recalculadas em tempo real.
          </p>
        </div>

        <button
          type="button"
          onClick={onResetInventory}
          className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-amber-300 hover:text-amber-200"
        >
          Restaurar inventário
        </button>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950 p-4">
        <label className="block">
          <span className="text-sm font-medium text-slate-300">
            Adicionar reagente
          </span>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <select
              value={selectedReagentId}
              onChange={(event) =>
                onSelectedReagentChange(event.target.value)
              }
              disabled={!hasAddableReagents}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none transition focus:border-amber-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {hasAddableReagents ? (
                addableReagents.map((reagent) => (
                  <option key={reagent.itemId} value={reagent.itemId}>
                    {reagent.name}
                  </option>
                ))
              ) : (
                <option value="">Todos os reagentes já foram adicionados</option>
              )}
            </select>

            <button
              type="button"
              onClick={onAddInventoryItem}
              disabled={!hasAddableReagents}
              className="rounded-xl bg-amber-300 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Adicionar
            </button>
          </div>
        </label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.itemId}
            className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <label
                htmlFor={item.itemId}
                className="block text-sm text-slate-400"
              >
                {item.name}
              </label>

              <button
                type="button"
                onClick={() => onRemoveInventoryItem(item.itemId)}
                className="text-xs font-semibold text-slate-500 transition hover:text-red-300"
              >
                Remover
              </button>
            </div>

            <input
              id={item.itemId}
              type="number"
              min="0"
              value={item.quantity}
              onChange={(event) => {
                const quantity = Number(event.target.value);

                // Evita que entradas inválidas quebrem o cálculo central de crafting.
                onQuantityChange(
                  item.itemId,
                  Number.isNaN(quantity) ? 0 : quantity
                );
              }}
              className="mt-3 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-2xl font-bold text-white outline-none transition focus:border-amber-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
}