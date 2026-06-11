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
  const hasInventoryItems = items.length > 0;

  return (
    <section className="rounded-3xl border border-[#8f6a34]/35 bg-[#24180f]/90 p-5 shadow-xl shadow-black/20 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f0c86a]">
            Inventário
          </p>

          <h2 className="mt-1 text-2xl font-bold text-[#fff4d6]">
            Reagentes informados
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#dfcfac]/70">
            Monte seu inventário manualmente, ajuste quantidades e acompanhe as
            receitas sendo recalculadas em tempo real.
          </p>
        </div>

        <button
          type="button"
          onClick={onResetInventory}
          className="rounded-xl border border-[#8f6a34]/40 bg-[#1b120b] px-4 py-2 text-sm font-semibold text-[#f3e7c3] transition hover:border-[#d4a64a] hover:text-[#f7d98d]"
        >
          Restaurar inventário
        </button>
      </div>

      <div className="mt-5 rounded-2xl border border-[#b8893c]/20 bg-gradient-to-br from-[#2d1e13] to-[#22170f] p-4">
        <label className="block">
          <span className="text-sm font-semibold text-[#f6ebcb]">
            Adicionar reagente ao inventário
          </span>

          <p className="mt-1 text-xs leading-5 text-[#cdb88e]/60">
            A lista mostra apenas reagentes usados por alguma receita e que
            ainda não estão no inventário atual.
          </p>

          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <select
              value={selectedReagentId}
              onChange={(event) =>
                onSelectedReagentChange(event.target.value)
              }
              disabled={!hasAddableReagents}
              className="w-full rounded-xl border border-[#7b5d35] bg-[#1b120b] px-3 py-2 text-sm text-[#fff4d6] outline-none transition focus:border-[#d4a64a] disabled:cursor-not-allowed disabled:opacity-50"
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
              className="rounded-xl bg-[#d4a64a] px-5 py-2 text-sm font-black text-[#2b1b0d] transition hover:bg-[#e0b85e] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Adicionar
            </button>
          </div>
        </label>
      </div>

      {hasInventoryItems ? (
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.itemId}
              className="group rounded-2xl border border-[#6f5330] bg-[#1b120b] p-4 transition hover:border-[#b8893c] hover:bg-[#22160d]"
            >
              <div className="flex items-start justify-between gap-3">
                <label
                  htmlFor={item.itemId}
                  className="block text-sm font-semibold text-[#f6ebcb]"
                >
                  {item.name}
                </label>

                <button
                  type="button"
                  onClick={() => onRemoveInventoryItem(item.itemId)}
                  className="text-xs font-semibold text-[#bfa679] transition hover:text-red-300"
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

                  // Protege o cálculo contra valores inválidos digitados no campo numérico.
                  onQuantityChange(
                    item.itemId,
                    Number.isNaN(quantity) ? 0 : quantity
                  );
                }}
                className="mt-3 w-full rounded-xl border border-[#7b5d35] bg-[#2a1b10] px-3 py-2 text-2xl font-black text-[#fff4d6] outline-none transition focus:border-[#d4a64a]"
              />

              <p className="mt-2 text-xs text-[#cdb88e]/60">
                Quantidade disponível na bag simulada.
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-2xl border border-dashed border-[#7b5d35] bg-[#1b120b]/80 p-8 text-center">
          <h3 className="text-lg font-bold text-[#fff4d6]">
            Nenhum reagente informado
          </h3>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#dfcfac]/70">
            Adicione um reagente pelo seletor acima ou importe um inventário em
            JSON para começar a calcular possibilidades de craft.
          </p>
        </div>
      )}
    </section>
  );
}