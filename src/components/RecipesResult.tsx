import { RecipeCard } from "@/components/RecipeCard";
import type { CraftOption } from "@/types/crafting";

type RecipesResultProps = {
  craftOptions: CraftOption[];
  isLoading: boolean;
  errorMessage: string | null;
};

export function RecipesResult({
  craftOptions,
  isLoading,
  errorMessage,
}: RecipesResultProps) {
  if (isLoading) {
    return (
      <section>
        <div className="rounded-3xl border border-[#8f6a34]/35 bg-[#24180f]/90 p-8 text-center shadow-xl shadow-black/20">
          <h2 className="text-xl font-black text-[#fff4d6]">
            Carregando receitas...
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#dfcfac]/70">
            O sistema está consultando a rota interna de receitas antes de
            calcular as possibilidades de craft.
          </p>
        </div>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section>
        <div className="rounded-3xl border border-red-300/20 bg-red-950/20 p-8 text-center shadow-xl shadow-black/20">
          <h2 className="text-xl font-black text-red-100">
            Não foi possível carregar as receitas
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-red-100/75">
            {errorMessage}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#f0c86a]">
            Resultado
          </p>

          <h2 className="mt-1 text-2xl font-black text-[#fff4d6]">
            Possibilidades de craft
          </h2>
        </div>

        <p className="text-sm text-[#dfcfac]/65">
          {craftOptions.length} receita(s) analisada(s)
        </p>
      </div>

      {craftOptions.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-[#7b5d35] bg-[#24180f]/80 p-8 text-center">
          <h3 className="text-lg font-black text-[#fff4d6]">
            Nenhuma receita encontrada
          </h3>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#dfcfac]/70">
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