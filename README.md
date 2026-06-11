# Azeroth Reagent Vendor

Aplicação web para jogadores de **World of Warcraft** descobrirem quais itens podem ser fabricados a partir dos reagentes disponíveis no inventário.

O projeto utiliza uma lógica de **consulta reversa de crafting**: em vez de partir de uma receita específica, o jogador informa os materiais que possui e o sistema calcula quais receitas estão disponíveis, quais estão quase completas e quais reagentes ainda faltam.

## Deploy

Acesse o projeto publicado:

https://azeroth-reagent-vendor.vercel.app/

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
* Interface responsiva com identidade visual inspirada em fantasia e crafting.

## Tecnologias utilizadas

* Next.js
* React
* TypeScript
* Tailwind CSS
* React Hooks
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
* Regras de negócio aplicadas no frontend.
* Organização de projeto com foco em escalabilidade.

## Estrutura do projeto

```txt
src/
├── app/
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
│       └── calculateCraftOptions.ts
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

## Exemplo de uso

Inventário informado:

```txt
Barra de Cobalto: 10
Couro Pesado: 5
```

Receita analisada:

```txt
Espada Grande de Cobalto
Requer:
- 5 Barras de Cobalto
- 2 Couros Pesados
```

Resultado:

```txt
Status: Craftável agora
Quantidade possível: 2 unidades
```

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

A aplicação ainda utiliza dados fictícios, mas já possui a base de interface, regras de negócio, persistência local e estrutura preparada para evoluções futuras.
