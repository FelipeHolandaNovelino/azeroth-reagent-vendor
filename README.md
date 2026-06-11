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

Esta primeira versão utiliza dados mockados para validar a lógica principal do produto e preparar a base para futuras integrações com dados reais.

## Funcionalidades

* Cadastro manual de reagentes no inventário.
* Edição de quantidade dos materiais.
* Adição e remoção de reagentes.
* Cálculo automático de receitas craftáveis.
* Identificação de receitas quase craftáveis.
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
* Regras de negócio aplicadas no frontend.
* Organização de projeto com foco em escalabilidade.

## Estrutura do projeto

```txt
src/
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
│   ├── craftingApiClient.ts
│   └── craftingDataService.ts
└── types/
    └── crafting.ts
```

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

## Dados mockados

Esta versão utiliza dados fictícios para validar a lógica principal do produto.

A estrutura foi pensada para permitir uma evolução futura com dados reais vindos da Blizzard API ou de uma base própria de receitas.

## Próximas melhorias

* Integração com a Blizzard API.
* Catálogo real de itens e receitas.
* Login com Battle.net.
* Importação de inventário via AddOn.
* Consulta de valores da Auction House.
* Sistema de favoritos para receitas.
* Planejador de materiais faltantes.

## Status

Projeto publicado e funcional como primeira versão de portfólio.

A aplicação ainda utiliza dados fictícios, mas já possui a base de interface, regras de negócio, persistência local, rota interna, testes unitários e estrutura preparada para evoluções futuras.
