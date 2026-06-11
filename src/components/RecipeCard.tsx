import type { CraftOption, RecipeStatus } from "@/types/crafting";

const statusLabels: Record<RecipeStatus, string> = {
  craftable: "Craftável agora",
  almost: "Quase craftável",
  unavailable: "Indisponível",
};

const statusStyles: Record<RecipeStatus, string> = {
  craftable:
    "border-emerald-400/25 bg-emerald-950/15 text-emerald-100 shadow-emerald-950/10",
  almost:
    "border-[#d4a64a]/30 bg-[#5a411b]/15 text-[#f4deb0] shadow-[#5a411b]/10",
  unavailable:
    "border-[#355c8c]/25 bg-[#1d2d43]/15 text-[#dbe7f6] shadow-[#1d2d43]/10",
};

const statusBadgeStyles: Record<RecipeStatus, string> = {
  craftable: "border-emerald-400/30 bg-emerald-400/10 text-emerald-100",
  almost: "border-[#d4a64a]/30 bg-[#d4a64a]/10 text-[#f5d88a]",
  unavailable: "border-[#355c8c]/30 bg-[#355c8c]/10 text-[#dbe7f6]",
};

type RecipeCardProps = {
  craftOption: CraftOption;
};

export function RecipeCard({ craftOption }: RecipeCardProps) {
  return (
    <article
      className={`rounded-2xl border bg-[#24180f]/90 p-5 shadow-xl ${statusStyles[craftOption.status]}`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#f0c86a]/85">
            {craftOption.profession} · {craftOption.craftedItemType}
          </p>

          <h2 className="mt-2 text-xl font-black text-[#fff4d6]">
            {craftOption.recipeName}
          </h2>
        </div>

        <span
          className={`rounded-full border px-3 py-1 text-xs font-black ${statusBadgeStyles[craftOption.status]}`}
        >
          {statusLabels[craftOption.status]}
        </span>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#dfcfac]/70">Progresso da receita</span>

          <span className="font-black text-[#fff4d6]">
            {craftOption.completionPercentage}%
          </span>
        </div>

        <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#1b120b]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#b8893c] to-[#f2d388]"
            style={{ width: `${craftOption.completionPercentage}%` }}
          />
        </div>
      </div>

      {craftOption.status === "craftable" && (
        <p className="mt-4 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-sm text-emerald-100">
          Você pode fabricar <strong>{craftOption.maxCrafts}</strong>{" "}
          unidade(s) com os reagentes atuais.
        </p>
      )}

      <div className="mt-5">
        <h3 className="text-sm font-black text-[#fff4d6]">Receita completa</h3>

        <ul className="mt-3 space-y-2">
          {craftOption.reagents.map((reagent) => (
            <li
              key={reagent.itemId}
              className="rounded-xl border border-[#6f5330] bg-[#1b120b]/85 px-3 py-3 text-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-semibold text-[#fff4d6]">
                  {reagent.name}
                </span>

                <span
                  className={`rounded-full px-2 py-1 text-xs font-black ${
                    reagent.isAvailable
                      ? "bg-emerald-400/15 text-emerald-200"
                      : "bg-red-400/15 text-red-200"
                  }`}
                >
                  {reagent.ownedQuantity}/{reagent.quantity}
                </span>
              </div>

              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#2a1b10]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#355c8c] to-[#d4a64a]"
                  style={{
                    width: `${Math.min(
                      (reagent.ownedQuantity / reagent.quantity) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>

              <p className="mt-2 text-xs text-[#d8c7a0]/65">
                Requer {reagent.quantity}. Você possui{" "}
                {reagent.ownedQuantity}.
              </p>

              {!reagent.isAvailable && (
                <p className="mt-1 text-xs font-black text-red-200">
                  Faltam {reagent.missingQuantity}.
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>

      {craftOption.missingReagents.length > 0 && (
        <div className="mt-5 rounded-xl border border-red-300/15 bg-red-950/10 p-3">
          <h3 className="text-sm font-black text-[#fff4d6]">
            Resumo dos faltantes
          </h3>

          <ul className="mt-3 space-y-2">
            {craftOption.missingReagents.map((reagent) => (
              <li
                key={reagent.itemId}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <span>{reagent.name}</span>

                <span className="font-black text-red-200">
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