import { NextResponse } from "next/server";

import { getCraftingDataSource } from "@/config/craftingDataSourceConfig";
import { getAvailableRecipes } from "@/services/craftingDataService";

export async function GET() {
  try {
    const recipes = await getAvailableRecipes();
    const dataSource = getCraftingDataSource();

    // Esta rota interna isola a origem dos dados.
    // Hoje usa mocks; futuramente poderá usar Blizzard API sem expor credenciais no frontend.
    return NextResponse.json({
      dataSource,
      recipes,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Não foi possível carregar as receitas.";

    return NextResponse.json(
      {
        error: message,
        recipes: [],
      },
      {
        status: 500,
      }
    );
  }
}