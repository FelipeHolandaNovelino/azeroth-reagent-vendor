type CraftSummaryProps = {
  craftableCount: number;
  almostCraftableCount: number;
};

export function CraftSummary({
  craftableCount,
  almostCraftableCount,
}: CraftSummaryProps) {
  return (
    <header className="overflow-hidden rounded-3xl border border-amber-300/20 bg-slate-900 shadow-2xl shadow-black/30">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-slate-900 to-indigo-950/70" />

        <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
          <div>
            <div className="inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-amber-200">
              Azeroth Reagent Vendor
            </div>

            <h1 className="mt-5 max-w-4xl text-3xl font-black tracking-tight text-white sm:text-5xl">
              Descubra o que craftar com os reagentes esquecidos na sua bag.
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">
              Informe seus reagentes, analise receitas possíveis e veja o que
              falta para transformar materiais soltos em itens úteis para sua
              jornada em Azeroth.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full border border-slate-700 bg-slate-950/60 px-4 py-2 text-sm font-semibold text-slate-200">
                Consulta reversa de receitas
              </span>

              <span className="rounded-full border border-slate-700 bg-slate-950/60 px-4 py-2 text-sm font-semibold text-slate-200">
                Inventário persistente
              </span>

              <span className="rounded-full border border-slate-700 bg-slate-950/60 px-4 py-2 text-sm font-semibold text-slate-200">
                Preparado para importação por AddOn
              </span>
            </div>
          </div>

          <div className="grid gap-3">
            <div className="rounded-2xl border border-emerald-300/20 bg-emerald-950/40 p-5">
              <p className="text-sm font-medium text-emerald-200">
                Receitas craftáveis agora
              </p>

              <strong className="mt-2 block text-4xl font-black text-white">
                {craftableCount}
              </strong>

              <p className="mt-2 text-xs leading-5 text-emerald-100/70">
                Itens que já podem ser produzidos com o inventário atual.
              </p>
            </div>

            <div className="rounded-2xl border border-amber-300/20 bg-amber-950/40 p-5">
              <p className="text-sm font-medium text-amber-200">
                Quase prontas
              </p>

              <strong className="mt-2 block text-4xl font-black text-white">
                {almostCraftableCount}
              </strong>

              <p className="mt-2 text-xs leading-5 text-amber-100/70">
                Receitas próximas de ficarem disponíveis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}