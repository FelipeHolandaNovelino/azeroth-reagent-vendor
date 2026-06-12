# Blizzard API Integration Plan

Este documento descreve o plano técnico para evoluir o **Azeroth Reagent Vendor** de dados mockados para dados reais.

A versão `v1.0.0` validou a lógica principal do produto usando receitas fictícias. A próxima etapa é preparar a aplicação para consumir dados reais de itens, profissões e receitas sem expor credenciais no frontend.

## Objetivo

Integrar a aplicação com dados reais de **World of Warcraft**, mantendo a arquitetura segura, escalável e fácil de testar.

## Estratégia geral

A integração deve acontecer pelo lado server-side do Next.js.

O frontend não deve chamar diretamente a API externa com credenciais sensíveis. Em vez disso, o fluxo esperado será:

```txt
Frontend
  ↓
Rota interna Next.js
  ↓
Service server-side
  ↓
Blizzard API
  ↓
Adapter de dados
  ↓
Formato usado pelo app
```

## Por que usar rota interna?

A aplicação precisa proteger credenciais como:

* Client ID
* Client Secret
* Access Token

Essas informações não devem ficar disponíveis no navegador.

Por isso, a futura integração deve ser feita em arquivos server-side, como rotas dentro de:

```txt
src/app/api/
```

## Origem dos dados

A aplicação passa a ter uma configuração para definir a origem das receitas usadas pelo app.

Valores previstos:

* `mock`: usa os dados fictícios atuais.
* `blizzard`: futuramente usará dados reais vindos da Blizzard API.

O modo `mock` permanece como padrão para desenvolvimento, testes e demonstração da versão de portfólio.

## Variáveis de ambiente previstas

```env
CRAFTING_DATA_SOURCE=mock

BLIZZARD_CLIENT_ID=
BLIZZARD_CLIENT_SECRET=
BLIZZARD_REGION=us
BLIZZARD_NAMESPACE=static-us
BLIZZARD_LOCALE=pt_BR
```

Essas variáveis devem ser usadas somente no server-side.

O arquivo `.env.example` pode ser versionado porque não contém valores reais. Já arquivos como `.env.local` devem permanecer protegidos pelo `.gitignore`.

## Dados necessários

Para substituir os mocks atuais, o app precisa mapear dados como:

* receitas;
* itens craftáveis;
* reagentes;
* quantidade exigida por reagente;
* profissão relacionada;
* tipo do item;
* ícone do item;
* identificador externo do item;
* identificador externo da receita.

## Formato interno esperado

Mesmo que a Blizzard API retorne dados em outro formato, o app deve continuar usando o formato interno atual.

Exemplo:

```ts
type Recipe = {
  id: string;
  name: string;
  profession: string;
  craftedItemType: string;
  reagents: {
    itemId: string;
    name: string;
    quantity: number;
  }[];
};
```

A responsabilidade de converter dados externos para esse formato deve ficar em um adapter.

## Estrutura preparada

A aplicação já possui uma base inicial para futura integração:

```txt
src/
├── app/
│   └── api/
│       └── crafting/
│           └── recipes/
│               └── route.ts
├── config/
│   ├── blizzardConfig.ts
│   └── craftingDataSourceConfig.ts
├── services/
│   ├── craftingApiClient.ts
│   ├── craftingDataService.ts
│   ├── blizzardAuthService.ts
│   └── blizzardApiService.ts
├── adapters/
│   └── blizzardRecipeAdapter.ts
└── types/
    └── crafting.ts
```

## Estrutura futura sugerida

```txt
src/
├── app/
│   └── api/
│       └── crafting/
│           ├── recipes/
│           │   └── route.ts
│           ├── items/
│           │   └── route.ts
│           └── professions/
│               └── route.ts
├── services/
│   ├── craftingApiClient.ts
│   ├── craftingDataService.ts
│   ├── blizzardAuthService.ts
│   └── blizzardApiService.ts
├── adapters/
│   ├── blizzardRecipeAdapter.ts
│   ├── blizzardItemAdapter.ts
│   └── blizzardProfessionAdapter.ts
└── types/
    └── crafting.ts
```

## Etapas planejadas

### 1. Preparar variáveis de ambiente

Criar `.env.example` com os nomes das variáveis necessárias, sem valores reais.

Status: concluído.

### 2. Criar configuração da origem dos dados

Criar uma configuração para alternar entre dados mockados e futura integração real.

Status: em preparação.

### 3. Criar service de autenticação

Criar um service responsável por buscar e reutilizar access tokens da Blizzard API.

Status: concluído.

### 4. Criar service genérico da Blizzard API

Criar uma função server-side reutilizável para consultar endpoints da Blizzard API com token Bearer.

Status: concluído.

### 5. Criar adapters

Converter a resposta externa para o formato interno do app.

Status: iniciado.

### 6. Substituir dados mockados gradualmente

Manter fallback para mocks enquanto a integração real estiver em desenvolvimento.

Status: pendente.

### 7. Criar tratamento de erro

Adicionar mensagens claras para:

* falha de autenticação;
* indisponibilidade da API;
* resposta inesperada;
* ausência de dados;
* região ou locale inválidos.

Status: pendente.

## Cuidados importantes

* Não expor credenciais no frontend.
* Não salvar tokens sensíveis no `localStorage`.
* Validar respostas externas antes de usar.
* Manter os testes da regra de crafting independentes da API.
* Evitar acoplar componentes React ao formato da API externa.
* Usar adapters para proteger o domínio interno do app.
* Manter `CRAFTING_DATA_SOURCE=mock` como padrão enquanto a integração real não estiver pronta.

## Status

Planejamento técnico inicial criado e atualizado.

A aplicação já possui base para alternar fontes de dados, autenticar com a Blizzard API no server-side, chamar endpoints externos de forma centralizada e adaptar receitas externas para o formato interno.

A implementação real da API deve continuar apenas após validação das variáveis de ambiente, endpoints necessários, formato das respostas e estratégia de fallback.
