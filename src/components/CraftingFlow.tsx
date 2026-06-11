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
    <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
          Fluxo da ferramenta
        </p>

        <h2 className="text-2xl font-bold text-white">
          Da bag ao craft em poucos passos
        </h2>

        <p className="max-w-3xl text-sm leading-6 text-slate-400">
          Esta versão ainda usa dados mockados, mas já valida o comportamento
          central do produto: partir dos reagentes do jogador para descobrir
          receitas, faltantes e oportunidades de craft.
        </p>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {flowSteps.map((step) => (
          <article
            key={step.badge}
            className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-amber-300/30 bg-amber-300/10 text-sm font-black text-amber-200">
              {step.badge}
            </span>

            <h3 className="mt-4 text-base font-bold text-white">
              {step.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              {step.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}