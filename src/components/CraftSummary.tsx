type CraftSummaryProps = {
  craftableCount: number;
  almostCraftableCount: number;
};

export function CraftSummary({
  craftableCount,
  almostCraftableCount,
}: CraftSummaryProps) {
  return (
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
  );
}