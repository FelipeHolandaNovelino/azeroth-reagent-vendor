const flowSteps = [
  {
    title: "Informe ou importe seus reagentes",
    description:
      "Monte seu inventário manualmente ou cole um JSON para simular uma futura importação gerada por AddOn.",
    badge: "01",
  },
  {
    title: "Analise possibilidades",
    description:
      "O sistema cruza seus reagentes com as receitas e calcula o que já pode ser craftado.",
    badge: "02",
  },
  {
    title: "Veja o que falta",
    description:
      "Cada receita mostra progresso, quantidade possuída e materiais faltantes para completar o craft.",
    badge: "03",
  },
  {
    title: "Salve ou compartilhe",
    description:
      "O inventário fica salvo no navegador e também pode ser exportado em JSON para testes ou reaproveitamento.",
    badge: "04",
  },
];

export function CraftingFlow() {
  return (
    <section className="rounded-3xl border border-[#8f6a34]/35 bg-[#24180f]/90 p-6 shadow-xl shadow-black/20">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-[#f0c86a]">
          Fluxo da ferramenta
        </p>

        <h2 className="text-2xl font-black text-[#fff4d6]">
          Da bag ao craft em poucos passos
        </h2>

        <p className="max-w-3xl text-sm leading-6 text-[#e4d3ae]/75">
          Esta versão usa dados mockados, mas já valida o comportamento central:
          partir dos reagentes do jogador para descobrir receitas, faltantes e
          oportunidades de craft.
        </p>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {flowSteps.map((step) => (
          <article
            key={step.badge}
            className="rounded-2xl border border-[#8f6a34]/20 bg-[#2b1d12]/80 p-4 transition hover:border-[#d4a64a]/35 hover:bg-[#312114]"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#d4a64a]/40 bg-[#d4a64a]/10 text-sm font-black text-[#f6d88b]">
              {step.badge}
            </span>

            <h3 className="mt-4 text-base font-bold text-[#fff4d6]">
              {step.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#dfcfac]/70">
              {step.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}