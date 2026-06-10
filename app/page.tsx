import { mockInventory, mockRecipes } from "@/data/mockCraftingData";
import { calculateCraftOptions } from "@/lib/crafting/calculateCraftOptions";
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

function RecipeCard({ craftOption }: { craftOption: CraftOption }) {
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
          Você pode fabricar{" "}
          <strong>{craftOption.maxCrafts}</strong>{" "}
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
              className="flex items-center justify-between rounded-xl bg-black/20 px-3 py-2 text-sm"
            >
              <span>{reagent.name}</span>
              <span className="font-semibold">{reagent.quantity}</span>
            </li>
          ))}
        </ul>
      </div>

      {craftOption.missingReagents.length > 0 && (
        <div className="mt-5">
          <h3 className="text-sm font-semibold text-white">
            Reagentes faltantes
          </h3>

          <ul className="mt-3 space-y-2">
            {craftOption.missingReagents.map((reagent) => (
              <li
                key={reagent.itemId}
                className="rounded-xl bg-black/20 px-3 py-2 text-sm"
              >
                <div className="flex items-center justify-between">
                  <span>{reagent.name}</span>
                  <span className="font-semibold">
                    falta {reagent.missingQuantity}
                  </span>
                </div>

                <p className="mt-1 text-xs text-slate-400">
                  Possui {reagent.ownedQuantity} de {reagent.requiredQuantity} necessários.
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

export default function Home() {
  const craftOptions = calculateCraftOptions(mockInventory, mockRecipes);

  const craftableCount = craftOptions.filter(
    (option) => option.status === "craftable"
  ).length;

  const almostCraftableCount = craftOptions.filter(
    (option) => option.status === "almost"
  ).length;

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8 text-slate-100">
      <section className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            Azeroth Reagent Vendor
          </p>

          <div className="mt-4 grid gap-6 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                Descubra o que você pode craftar com os reagentes da sua bag.
              </h1>

              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
                Esta primeira versão usa dados fictícios para validar a lógica
                central do projeto: partir dos reagentes disponíveis e encontrar
                receitas craftáveis, quase craftáveis e materiais faltantes.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                <p className="text-sm text-slate-400">Craftáveis agora</p>
                <strong className="mt-1 block text-3xl text-white">
                  {craftableCount}
                </strong>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                <p className="text-sm text-slate-400">Quase craftáveis</p>
                <strong className="mt-1 block text-3xl text-white">
                  {almostCraftableCount}
                </strong>
              </div>
            </div>
          </div>
        </header>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <h2 className="text-xl font-bold text-white">
            Reagentes informados
          </h2>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {mockInventory.map((item) => (
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

        <section>
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Resultado
              </p>

              <h2 className="mt-1 text-2xl font-bold text-white">
                Possibilidades de craft
              </h2>
            </div>

            <p className="text-sm text-slate-400">
              {craftOptions.length} receita(s) analisada(s)
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {craftOptions.map((craftOption) => (
              <RecipeCard
                key={craftOption.recipeId}
                craftOption={craftOption}
              />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}