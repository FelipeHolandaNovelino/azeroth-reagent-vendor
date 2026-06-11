import { getBlizzardConfig } from "@/config/blizzardConfig";
import { getBlizzardAccessToken } from "@/services/blizzardAuthService";

type BlizzardApiQueryParams = Record<
  string,
  string | number | boolean | undefined
>;

function createBlizzardApiUrl(
  endpointPath: string,
  queryParams: BlizzardApiQueryParams = {}
): string {
  const config = getBlizzardConfig();
  const normalizedEndpointPath = endpointPath.startsWith("/")
    ? endpointPath
    : `/${endpointPath}`;

  const url = new URL(
    `https://${config.region}.api.blizzard.com${normalizedEndpointPath}`
  );

  // A namespace e o locale são exigidos em muitas rotas de Game Data do WoW.
  url.searchParams.set("namespace", config.namespace);
  url.searchParams.set("locale", config.locale);

  Object.entries(queryParams).forEach(([key, value]) => {
    if (value === undefined) {
      return;
    }

    url.searchParams.set(key, String(value));
  });

  return url.toString();
}

export async function fetchBlizzardGameData<TResponse>(
  endpointPath: string,
  queryParams?: BlizzardApiQueryParams
): Promise<TResponse> {
  const token = await getBlizzardAccessToken();
  const url = createBlizzardApiUrl(endpointPath, queryParams);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch Blizzard Game Data. Endpoint: ${endpointPath}. Status: ${response.status}`
    );
  }

  const data: unknown = await response.json();

  return data as TResponse;
}