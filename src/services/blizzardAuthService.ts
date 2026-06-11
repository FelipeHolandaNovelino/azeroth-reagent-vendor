import { getBlizzardConfig } from "@/config/blizzardConfig";

type BlizzardTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope?: string;
};

export type BlizzardAccessToken = {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  expiresAt: number;
};

let cachedAccessToken: BlizzardAccessToken | null = null;

function getBlizzardOAuthTokenUrl(region: string): string {
  return `https://${region}.battle.net/oauth/token`;
}

function isTokenStillValid(token: BlizzardAccessToken): boolean {
  const expirationSafetyWindowInMs = 60 * 1000;

  return Date.now() < token.expiresAt - expirationSafetyWindowInMs;
}

function isValidTokenResponse(value: unknown): value is BlizzardTokenResponse {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const tokenResponse = value as BlizzardTokenResponse;

  return (
    typeof tokenResponse.access_token === "string" &&
    typeof tokenResponse.token_type === "string" &&
    typeof tokenResponse.expires_in === "number"
  );
}

export async function getBlizzardAccessToken(): Promise<BlizzardAccessToken> {
  if (cachedAccessToken && isTokenStillValid(cachedAccessToken)) {
    return cachedAccessToken;
  }

  const config = getBlizzardConfig();
  const tokenUrl = getBlizzardOAuthTokenUrl(config.region);

  const credentials = Buffer.from(
    `${config.clientId}:${config.clientSecret}`
  ).toString("base64");

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to authenticate with Blizzard API. Status: ${response.status}`
    );
  }

  const data: unknown = await response.json();

  if (!isValidTokenResponse(data)) {
    throw new Error("Blizzard token response has an unexpected format.");
  }

  cachedAccessToken = {
    accessToken: data.access_token,
    tokenType: data.token_type,
    expiresIn: data.expires_in,
    expiresAt: Date.now() + data.expires_in * 1000,
  };

  return cachedAccessToken;
}