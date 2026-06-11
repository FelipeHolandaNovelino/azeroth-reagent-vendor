# Roadmap — Azeroth Reagent Vendor

Este documento registra a evolução planejada do projeto após a versão `v1.0.0`.

A primeira versão validou a lógica principal do produto com dados mockados, inventário editável, filtros, persistência local, importação/exportação em JSON, rota interna de receitas e testes unitários.

## v1.0.0 — Primeira versão funcional

Status: concluída.

Principais entregas:

- Interface responsiva.
- Inventário editável de reagentes.
- Adição e remoção de materiais.
- Cálculo de receitas craftáveis.
- Identificação de receitas quase craftáveis e indisponíveis.
- Exibição de materiais faltantes.
- Filtros por busca, status e profissão.
- Persistência com `localStorage`.
- Importação e exportação em JSON.
- Rota interna para carregamento de receitas.
- Testes unitários da regra central de crafting.
- Deploy publicado na Vercel.

## v2.0.0 — Preparação para dados reais

Objetivo: preparar a aplicação para consumir dados reais de itens, profissões e receitas.

### Prioridades técnicas

- Mapear quais dados serão necessários para substituir os mocks.
- Criar uma camada server-side para integração externa.
- Preparar variáveis de ambiente para credenciais.
- Separar melhor dados mockados e dados reais.
- Criar tratamento de erro para falhas de integração.
- Criar estados de carregamento mais robustos.
- Documentar a estratégia de integração.

### Dados necessários

A aplicação precisará de dados como:

- itens craftáveis;
- reagentes;
- quantidade exigida por receita;
- profissões;
- tipos de item;
- ícones de itens;
- identificadores externos para sincronização futura.

### Possível estrutura futura

```txt
src/
├── app/
│   └── api/
│       └── crafting/
│           ├── recipes/
│           ├── items/
│           └── professions/
├── services/
│   ├── craftingApiClient.ts
│   ├── craftingDataService.ts
│   └── blizzardApiService.ts
└── adapters/
    └── blizzardRecipeAdapter.ts