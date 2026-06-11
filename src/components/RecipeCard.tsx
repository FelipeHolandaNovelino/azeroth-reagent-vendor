import type { CraftOption, RecipeStatus } from "@/types/crafting";

const statusLabels: Record<RecipeStatus, string> = {
  craftable: "Craftável agora",
  almost: "Quase craftável",
  unavailable: "Indisponível",
};

const statusStyles: Record<RecipeStatus, string> = {
  craftable: "border-emerald-400 bg-emerald-950/30 text-emerald-100",
  almost: "border-amber-400 bg-amber-950/30 text-amber-100",
  unavailable: "border-slate-700 bg-slate-900/60 text-slate-300",
};

type RecipeCardProps = {
  craftOption: CraftOption;
};

export function RecipeCard({ craftOption }: RecipeCardProps) {
  return (
    <article
      className={`rounded-2xl border p-5 shadow-sm ${statusStyles[craftOption.status]}`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            {craftOption.profession} · {craftOption.craftedItemType}
          </p>

          <h2 className="mt-2 text-xl font-bold text-white">
            {craftOption.recipeName}
          </h2>
        </div>

        <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold">
          {statusLabels[craftOption.status]}
        </span>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-300">Progresso da receita</span>

          <span className="font-semibold text-white">
            {craftOption.completionPercentage}%
          </span>
        </div>

        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-white"
            style={{ width: `${craftOption.completionPercentage}%` }}
          />
        </div>
      </div>

      {craftOption.status === "craftable" && (
        <p className="mt-4 rounded-xl bg-white/10 p-3 text-sm text-white">
          Você pode fabricar <strong>{craftOption.maxCrafts}</strong>{" "}
          unidade(s) com os reagentes atuais.
        </p>
      )}

      <div className="mt-5">
        <h3 className="text-sm font-semibold text-white">
          Receita completa
        </h3>

        <ul className="mt-3 space-y-2">
          {craftOption.reagents.map((reagent) => (
            <li
              key={reagent.itemId}
              className="rounded-xl bg-black/20 px-3 py-3 text-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium text-white">{reagent.name}</span>

                <span
                  className={`rounded-full px-2 py-1 text-xs font-bold ${
                    reagent.isAvailable
                      ? "bg-emerald-400/15 text-emerald-200"
                      : "bg-red-400/15 text-red-200"
                  }`}
                >
                  {reagent.ownedQuantity}/{reagent.quantity}
                </span>
              </div>

              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-white"
                  style={{
                    width: `${Math.min(
                      (reagent.ownedQuantity / reagent.quantity) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>

              <p className="mt-2 text-xs text-slate-400">
                Requer {reagent.quantity}. Você possui{" "}
                {reagent.ownedQuantity}.
              </p>

              {!reagent.isAvailable && (
                <p className="mt-1 text-xs font-semibold text-red-200">
                  Faltam {reagent.missingQuantity}.
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>

      {craftOption.missingReagents.length > 0 && (
        <div className="mt-5 rounded-xl border border-white/10 bg-black/20 p-3">
          <h3 className="text-sm font-semibold text-white">
            Resumo dos faltantes
          </h3>

          <ul className="mt-3 space-y-2">
            {craftOption.missingReagents.map((reagent) => (
              <li
                key={reagent.itemId}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <span>{reagent.name}</span>

                <span className="font-semibold text-red-200">
                  falta {reagent.missingQuantity}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}