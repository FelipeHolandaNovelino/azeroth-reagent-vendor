import path from "node:path";

import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      // Permite que o Vitest entenda imports usando "@/..."
      // do mesmo jeito que o Next.js entende pelo tsconfig.json.
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    // Os testes da regra de crafting são testes de lógica pura,
    // então não precisam simular navegador ou DOM.
    environment: "node",
    globals: false,
  },
});