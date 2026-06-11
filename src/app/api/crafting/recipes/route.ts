import { NextResponse } from "next/server";

import { getAvailableRecipes } from "@/services/craftingDataService";

export async function GET() {
  const recipes = getAvailableRecipes();

  // Esta rota interna isola a origem dos dados.
  // No futuro, ela poderá buscar receitas reais na Blizzard API sem expor credenciais no frontend.
  return NextResponse.json({
    recipes,
  });
}