type CraftSummaryProps = {
  craftableCount: number;
  almostCraftableCount: number;
};

export function CraftSummary({
  craftableCount,
  almostCraftableCount,
}: CraftSummaryProps) {
  return (
    <header className="overflow-hidden rounded-3xl border border-[#b8893c]/40 bg-[#24180f]/95 shadow-2xl shadow-black/30">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7a5724]/35 via-[#24180f] to-[#2a1d13]/95" />
        <div className="absolute right-10 top-10 h-36 w-36 rounded-full bg-[#d4a64a]/10 blur-3xl" />
        <div className="absolute left-10 bottom-0 h-32 w-32 rounded-full bg-[#355c8c]/10 blur-3xl" />

        <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
          <div>
            <div className="inline-flex rounded-full border border-[#d4a64a]/40 bg-[#d4a64a]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-[#f5d88a]">
              Azeroth Reagent Vendor
            </div>

            <h1 className="mt-5 max-w-4xl text-3xl font-black tracking-tight text-[#fff4d6] sm:text-5xl">
              Transforme reagentes esquecidos em oportunidades de craft.
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-[#e8d8b0]/85">
              Informe os materiais da sua bag, descubra receitas possíveis e
              veja quais reagentes faltam para completar seus próximos crafts.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full border border-[#355c8c]/30 bg-[#1d2d43]/60 px-4 py-2 text-sm font-semibold text-[#d9e6f7]">
                Consulta reversa
              </span>

              <span className="rounded-full border border-[#b8893c]/30 bg-[#4a3519]/40 px-4 py-2 text-sm font-semibold text-[#f4deb0]">
                Inventário persistente
              </span>

              <span className="rounded-full border border-[#8a6a3b]/30 bg-[#322216]/50 px-4 py-2 text-sm font-semibold text-[#ead7a9]">
                Importação por JSON
              </span>
            </div>
          </div>

          <div className="grid gap-3">
            <div className="rounded-2xl border border-emerald-400/25 bg-emerald-950/20 p-5">
              <p className="text-sm font-semibold text-emerald-200">
                Craftáveis agora
              </p>

              <strong className="mt-2 block text-4xl font-black text-[#fff4d6]">
                {craftableCount}
              </strong>

              <p className="mt-2 text-xs leading-5 text-emerald-100/70">
                Receitas prontas para produzir com o inventário atual.
              </p>
            </div>

            <div className="rounded-2xl border border-[#d4a64a]/30 bg-[#5a411b]/25 p-5">
              <p className="text-sm font-semibold text-[#f3d48b]">
                Quase prontas
              </p>

              <strong className="mt-2 block text-4xl font-black text-[#fff4d6]">
                {almostCraftableCount}
              </strong>

              <p className="mt-2 text-xs leading-5 text-[#f2ddb2]/70">
                Receitas próximas de ficarem disponíveis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}