import type { InventoryItem } from "@/types/crafting";

type InventoryGridProps = {
  items: InventoryItem[];
};

export function InventoryGrid({ items }: InventoryGridProps) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
      <h2 className="text-xl font-bold text-white">
        Reagentes informados
      </h2>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.itemId}
            className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
          >
            <p className="text-sm text-slate-400">{item.name}</p>

            <strong className="mt-1 block text-2xl text-white">
              {item.quantity}
            </strong>
          </div>
        ))}
      </div>
    </section>
  );
}