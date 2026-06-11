export type BlizzardConfig = {
  clientId: string;
  clientSecret: string;
  region: string;
  namespace: string;
  locale: string;
};

const DEFAULT_BLIZZARD_REGION = "us";
const DEFAULT_BLIZZARD_NAMESPACE = "static-us";
const DEFAULT_BLIZZARD_LOCALE = "pt_BR";

function getRequiredEnvValue(key: string): string {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}

export function getBlizzardConfig(): BlizzardConfig {
  // Esta função deve ser usada apenas no server-side.
  // Nunca envie clientSecret, access token ou qualquer credencial para componentes client-side.
  return {
    clientId: getRequiredEnvValue("BLIZZARD_CLIENT_ID"),
    clientSecret: getRequiredEnvValue("BLIZZARD_CLIENT_SECRET"),
    region: process.env.BLIZZARD_REGION ?? DEFAULT_BLIZZARD_REGION,
    namespace: process.env.BLIZZARD_NAMESPACE ?? DEFAULT_BLIZZARD_NAMESPACE,
    locale: process.env.BLIZZARD_LOCALE ?? DEFAULT_BLIZZARD_LOCALE,
  };
}