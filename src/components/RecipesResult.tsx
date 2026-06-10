import { RecipeCard } from "@/components/RecipeCard";
import type { CraftOption } from "@/types/crafting";

type RecipesResultProps = {
  craftOptions: CraftOption[];
};

export function RecipesResult({ craftOptions }: RecipesResultProps) {
  return (
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

      {craftOptions.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/60 p-8 text-center">
          <h3 className="text-lg font-bold text-white">
            Nenhuma receita encontrada
          </h3>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-400">
            Ajuste a busca, altere os filtros ou modifique as quantidades dos
            reagentes para encontrar novas possibilidades de craft.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {craftOptions.map((craftOption) => (
            <RecipeCard
              key={craftOption.recipeId}
              craftOption={craftOption}
            />
          ))}
        </div>
      )}
    </section>
  );
}