import type { RecipeStatusFilter } from "@/types/crafting";

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
  const hasActiveFilters =
    searchTerm.trim().length > 0 ||
    selectedStatus !== "all" ||
    selectedProfession !== "all";

  return (
    <section className="rounded-3xl border border-[#8f6a34]/35 bg-[#24180f]/90 p-5 shadow-xl shadow-black/20 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f0c86a]">
            Filtros
          </p>

          <h2 className="mt-1 text-2xl font-bold text-[#fff4d6]">
            Refine as possibilidades de craft
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#dfcfac]/70">
            {totalResults} resultado(s) encontrado(s) com os critérios atuais.
          </p>
        </div>

        <button
          type="button"
          onClick={onClearFilters}
          disabled={!hasActiveFilters}
          className="rounded-xl border border-[#8f6a34]/40 bg-[#1b120b] px-4 py-2 text-sm font-semibold text-[#f3e7c3] transition hover:border-[#d4a64a] hover:text-[#f7d98d] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Limpar filtros
        </button>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr]">
        <label className="block">
          <span className="text-sm font-semibold text-[#f6ebcb]">
            Buscar receita, profissão ou reagente
          </span>

          <input
            type="text"
            value={searchTerm}
            onChange={(event) => onSearchTermChange(event.target.value)}
            placeholder="Ex: espada, poção, cobalto..."
            className="mt-2 w-full rounded-xl border border-[#7b5d35] bg-[#1b120b] px-3 py-2 text-sm text-[#fff4d6] outline-none transition placeholder:text-[#bca57c] focus:border-[#d4a64a]"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-[#f6ebcb]">
            Status da receita
          </span>

          <select
            value={selectedStatus}
            onChange={(event) =>
              onSelectedStatusChange(event.target.value as RecipeStatusFilter)
            }
            className="mt-2 w-full rounded-xl border border-[#7b5d35] bg-[#1b120b] px-3 py-2 text-sm text-[#fff4d6] outline-none transition focus:border-[#d4a64a]"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-[#f6ebcb]">
            Profissão
          </span>

          <select
            value={selectedProfession}
            onChange={(event) =>
              onSelectedProfessionChange(event.target.value)
            }
            className="mt-2 w-full rounded-xl border border-[#7b5d35] bg-[#1b120b] px-3 py-2 text-sm text-[#fff4d6] outline-none transition focus:border-[#d4a64a]"
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