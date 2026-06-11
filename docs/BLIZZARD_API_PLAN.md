# Blizzard API Integration Plan

Este documento descreve o plano técnico para evoluir o Azeroth Reagent Vendor de dados mockados para dados reais.

A versão `v1.0.0` validou a lógica principal do produto usando receitas fictícias. A próxima etapa será preparar a aplicação para consumir dados reais de itens, profissões e receitas sem expor credenciais no frontend.

## Objetivo

Integrar a aplicação com dados reais de World of Warcraft, mantendo a arquitetura segura, escalável e fácil de testar.

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