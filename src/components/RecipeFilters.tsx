import type { RecipeStatus } from "@/types/crafting";

type RecipeStatusFilter = RecipeStatus | "all";

type RecipeFiltersProps = {
  searchTerm: string;
  selectedStatus: RecipeStatusFilter;
  selectedProfession: string;
  professions: string[];
  totalResults: number;
  onSearchTermChange: (value: string) => void;
  onSelectedStatusChange: (value: RecipeStatusFilter) => void;
  onSelectedProfessionChange: (value: string) => void;
  onClearFilters: () => void;
};

const statusOptions: Array<{
  label: string;
  value: RecipeStatusFilter;
}> = [
  {
    label: "Todas",
    value: "all",
  },
  {
    label: "Craftáveis",
    value: "craftable",
  },
  {
    label: "Quase craftáveis",
    value: "almost",
  },
  {
    label: "Indisponíveis",
    value: "unavailable",
  },
];

export function RecipeFilters({
  searchTerm,
  selectedStatus,
  selectedProfession,
  professions,
  totalResults,
  onSearchTermChange,
  onSelectedStatusChange,
  onSelectedProfessionChange,
  onClearFilters,
}: RecipeFiltersProps) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Filtros
          </p>

          <h2 className="mt-1 text-xl font-bold text-white">
            Refine as possibilidades de craft
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            {totalResults} resultado(s) encontrado(s) com os filtros atuais.
          </p>
        </div>

        <button
          type="button"
          onClick={onClearFilters}
          className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-amber-300 hover:text-amber-200"
        >
          Limpar filtros
        </button>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr]">
        <label className="block">
          <span className="text-sm font-medium text-slate-300">
            Buscar receita
          </span>

          <input
            type="text"
            value={searchTerm}
            onChange={(event) => onSearchTermChange(event.target.value)}
            placeholder="Ex: espada, poção, manto..."
            className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-amber-300"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-300">
            Status
          </span>

          <select
            value={selectedStatus}
            onChange={(event) =>
              onSelectedStatusChange(event.target.value as RecipeStatusFilter)
            }
            className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none transition focus:border-amber-300"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-300">
            Profissão
          </span>

          <select
            value={selectedProfession}
            onChange={(event) =>
              onSelectedProfessionChange(event.target.value)
            }
            className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none transition focus:border-amber-300"
          >
            <option value="all">Todas</option>

            {professions.map((profession) => (
              <option key={profession} value={profession}>
                {profession}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}

export type { RecipeStatusFilter };