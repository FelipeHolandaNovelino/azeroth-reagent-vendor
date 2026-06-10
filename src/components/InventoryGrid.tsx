import type { InventoryItem } from "@/types/crafting";

type InventoryGridProps = {
  items: InventoryItem[];
  onQuantityChange: (itemId: string, quantity: number) => void;
  onResetInventory: () => void;
};

export function InventoryGrid({
  items,
  onQuantityChange,
  onResetInventory,
}: InventoryGridProps) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">
            Reagentes informados
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Altere as quantidades para recalcular as possibilidades de craft.
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

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.itemId}
            className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
          >
            <label
              htmlFor={item.itemId}
              className="block text-sm text-slate-400"
            >
              {item.name}
            </label>

            <input
              id={item.itemId}
              type="number"
              min="0"
              value={item.quantity}
              onChange={(event) => {
                const quantity = Number(event.target.value);

                onQuantityChange(item.itemId, quantity);
              }}
              className="mt-3 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-2xl font-bold text-white outline-none transition focus:border-amber-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
}