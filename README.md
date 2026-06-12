# Azeroth Reagent Vendor

Aplicação web para jogadores de **World of Warcraft** descobrirem quais itens podem ser fabricados a partir dos reagentes disponíveis no inventário.

O projeto utiliza uma lógica de **consulta reversa de crafting**: em vez de partir de uma receita específica, o jogador informa os materiais que possui e o sistema calcula quais receitas estão disponíveis, quais estão quase completas e quais reagentes ainda faltam.

## Deploy

Acesse o projeto publicado:

https://azeroth-reagent-vendor.vercel.app/

## Versão atual

**v1.0.0** — Primeira versão funcional publicada.

Esta versão inclui a base principal do produto: inventário editável, cálculo de receitas, filtros, persistência local, importação/exportação em JSON, rota interna para receitas e testes unitários para a regra central de crafting.

A release está disponível na aba **Releases** do repositório.

## Sobre o projeto

Jogadores de World of Warcraft acumulam diversos reagentes durante a gameplay, mas nem sempre sabem quais itens podem ser produzidos com esses materiais.

O **Azeroth Reagent Vendor** resolve esse problema permitindo que o usuário monte seu inventário manualmente, visualize possibilidades de craft, acompanhe materiais faltantes e exporte ou importe os dados em JSON.

A versão atual utiliza dados mockados para validar a lógica principal do produto, mas a arquitetura já começou a ser preparada para uma futura integração server-side com a Blizzard API.

## Funcionalidades

* Cadastro manual de reagentes no inventário.
* Edição de quantidade dos materiais.
* Adição e remoção de reagentes.
* Cálculo automático de receitas craftáveis.
* Identificação de receitas quase craftáveis e indisponíveis.
* Exibição de materiais faltantes.
* Progresso individual de cada reagente na receita.
* Filtros por busca, status e profissão.
* Persistência do inventário com `localStorage`.
* Importação e exportação de inventário em JSON.
* Carregamento de receitas por rota interna do Next.js.
* Testes unitários para a lógica principal de crafting.
* Interface responsiva com identidade visual inspirada em fantasia e crafting.

## Tecnologias utilizadas

* Next.js
* React
* TypeScript
* Tailwind CSS
* React Hooks
* Vitest
* localStorage
* Vercel

## Conceitos praticados

* Componentização com React.
* Separação de responsabilidades.
* Custom hooks.
* Tipagem com TypeScript.
* Manipulação de estado.
* Persistência local de dados.
* Filtros dinâmicos.
* Rotas internas com Next.js.
* Testes unitários com Vitest.
* Services e adapters.
* Configuração por variáveis de ambiente.
* Preparação de integração server-side com API externa.
* Organização de projeto com foco em escalabilidade.

## Estrutura do projeto

```txt
src/
├── adapters/
│   ├── __tests__/
│   │   └── blizzardRecipeAdapter.test.ts
│   └── blizzardRecipeAdapter.ts
├── app/
│   ├── api/
│   │   └── crafting/
│   │       └── recipes/
│   │           └── route.ts
│   └── page.tsx
├── components/
│   ├── CraftingDashboard.tsx
│   ├── CraftingFlow.tsx
│   ├── CraftSummary.tsx
│   ├── InventoryGrid.tsx
│   ├── InventoryImportExport.tsx
│   ├── RecipeCard.tsx
│   ├── RecipeFilters.tsx
│   └── RecipesResult.tsx
├── config/
│   ├── blizzardConfig.ts
│   └── craftingDataSourceConfig.ts
├── data/
│   └── mockCraftingData.ts
├── hooks/
│   ├── useCraftingResults.ts
│   └── useInventory.ts
├── lib/
│   └── crafting/
│       ├── __tests__/
│       │   └── calculateCraftOptions.test.ts
│       └── calculateCraftOptions.ts
├── services/
│   ├── blizzardApiService.ts
│   ├── blizzardAuthService.ts
│   ├── craftingApiClient.ts
│   └── craftingDataService.ts
└── types/
    └── crafting.ts
```

## Documentação técnica

O projeto possui documentação complementar para evolução da aplicação:

```txt
ROADMAP.md
docs/BLIZZARD_API_PLAN.md
.env.example
vitest.config.ts
```

Esses arquivos registram o planejamento da evolução do projeto, a estratégia de integração com a Blizzard API, as variáveis de ambiente previstas e a configuração dos testes unitários.

## Como rodar localmente

Clone o repositório:

```bash
git clone https://github.com/FelipeHolandaNovelino/azeroth-reagent-vendor.git
```

Acesse a pasta do projeto:

```bash
cd azeroth-reagent-vendor
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse no navegador:

```txt
http://localhost:3000
```

## Variáveis de ambiente

O projeto possui um arquivo `.env.example` com as variáveis previstas para a futura integração com a Blizzard API.

```env
CRAFTING_DATA_SOURCE=mock

BLIZZARD_CLIENT_ID=
BLIZZARD_CLIENT_SECRET=
BLIZZARD_REGION=us
BLIZZARD_NAMESPACE=static-us
BLIZZARD_LOCALE=pt_BR
```

A versão atual deve permanecer com:

```env
CRAFTING_DATA_SOURCE=mock
```

As credenciais reais não devem ser versionadas no GitHub.

## Scripts disponíveis

```bash
npm run dev
```

Inicia o projeto em modo de desenvolvimento.

```bash
npm run build
```

Gera a versão de produção.

```bash
npm run test:run
```

Executa os testes unitários.

```bash
npm run check
```

Executa testes e build em sequência para validar o projeto antes de um push importante.

## Como funciona a lógica de crafting

O sistema compara os reagentes disponíveis no inventário com os reagentes exigidos em cada receita.

Para cada receita, ele calcula:

* status da receita;
* porcentagem de conclusão;
* quantidade máxima craftável;
* reagentes disponíveis;
* reagentes faltantes.

Os status possíveis são:

```txt
Craftável agora
Quase craftável
Indisponível
```

## Preparação para Blizzard API

A aplicação ainda utiliza dados fictícios, mas já possui uma base inicial para futura integração com dados reais:

* configuração de variáveis de ambiente;
* seletor de origem de dados;
* rota interna para receitas;
* service de autenticação da Blizzard;
* service genérico para chamadas à Blizzard API;
* adapter para converter receitas externas para o formato interno do app;
* documentação técnica da estratégia de integração.

A integração real ainda não está ativa na interface pública.

## Próximas melhorias

* Ativar integração real com a Blizzard API.
* Mapear catálogo real de itens, receitas e profissões.
* Exibir ícones dos itens.
* Criar tela de catálogo de receitas.
* Adicionar favoritos de receitas.
* Criar planejador de materiais faltantes.
* Estudar importação de inventário via AddOn.
* Avaliar consulta de valores da Auction House.

## Status

Projeto publicado e funcional como primeira versão de portfólio.

A aplicação já possui interface, regras de negócio, persistência local, rota interna, testes unitários, release publicada e uma base técnica inicial preparada para evoluções futuras com API externa.
