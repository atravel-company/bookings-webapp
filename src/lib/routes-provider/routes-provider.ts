import appPaths from "./maps/app-paths.json";
import apiPaths from './maps/api-paths.json';

export type AppPathKey = keyof typeof appPaths;

/**
 * Build a URL from a given set of route definitions.
 *
 * @template RouteCollection - A record where keys are route names and values are path strings.
 * @template K - A key from RouteCollection.
 *
 * @param availableRoutes The object containing route templates (e.g., imported from a JSON file).
 * @param key   One of the keys in the provided `availableRoutes`.
 * @param params
 * Values to inject into `:param` placeholders,
 * plus any extra props become query-string entries.
 * @param host  Optional host (e.g. "https://api.example.com").
 * - Defaults to NEXT_PUBLIC_BOOKINGS_API_HOST.
 * - Pass `''` to get a relative URL.
 * - Pass `'local'` to use http://localhost:3000.
 */
export function generateRoute<
  RouteCollection extends Record<string, string>,
  PathKey extends keyof RouteCollection
>(
  availableRoutes: RouteCollection,
  key: PathKey,
  params: Record<string, string | number | boolean | string[] | undefined> = {},
  host?: "local" | string
): string {
  const template = availableRoutes[key] as string;

  if (typeof template !== "string") {
    throw new Error(
      `Route template for key "${String(key)}" is not a string or is missing.`
    );
  }

  // 1) Inject path params, error on missing
  const used = new Set<string>();
  const path = template.replace(/:([A-Za-z0-9_]+)/g, (_, name: string) => {
    if (params[name] == null) {
      throw new Error(
        `Missing required route parameter "${name}" for route key "${String(
          key
        )}".`
      );
    }
    used.add(name);
    return encodeURIComponent(String(params[name]));
  });

  // 2) Gather any leftover params into a query string
  const query = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (used.has(k)) continue;

    if (Array.isArray(v)) {
      v.forEach((item) => query.append(k, String(item)));
    } else {
      query.append(k, String(v));
    }
  }

  const qs = query.toString();
  const fullPath = path + (qs ? `?${qs}` : "");

  let prefix = "";
  if (host === undefined) {
    prefix = process.env.NEXT_PUBLIC_BOOKINGS_API_HOST ?? "";
  } else if (host === "local") {
    prefix = "http://localhost:3000";
  } else {
    prefix = host;
  }
  // trim any trailing slash on the prefix
  const normalized = prefix.replace(/\/+$/, "");

  return normalized + fullPath;
}

/**
 * Client-side URL (local only) using application-specific routes from app-paths.json.
 *
 * @param key   One of the keys in `app-paths.json`.
 * @param params Values to inject into `:param` placeholders and for query string.
 */
export function appRoute<K extends AppPathKey>(
  key: K,
  params: Record<string, string | number | boolean | string[] | undefined> = {}
): string {
  return generateRoute(appPaths, key, params, "local");
}

export type ApiPathKey = keyof typeof apiPaths;

/**
 * Generates a full API URL using routes defined in `api-paths.json`.
 *
 * @template K - A key from ApiPathKey, representing a specific API route.
 *
 * @param key The specific API route key (e.g., "GET_USER", "CREATE_ORDER").
 * @param params
 * An object containing values for path parameters (e.g., `:id`)
 * and any additional key-value pairs to be appended as a query string.
 * @param host
 * Optional host override.
 * - If `undefined` (default), uses `process.env.NEXT_PUBLIC_DEXTER_API_HOST`.
 * - If `'local'`, uses `http://localhost:3000`.
 * - If any other string, uses that string as the host.
 * - If `''`, it will generate a relative URL (though typically for API routes, a host is desired).
 * @returns A fully constructed URL string for the API endpoint.
 *
 * @example
 * // Assuming api-paths.json contains: "GET_USER": "/dexter/users/:id"
 * const userUrl = apiRoute('GET_USER', { id: 123, include_details: true });
 * // Might produce: "https://api.example.com/dexter/users/123?include_details=true"
 *
 * const localOrderUrl = apiRoute('CREATE_ORDER', {}, 'local');
 * // Might produce: "http://localhost:3000/dexter/orders"
 */
export function apiRoute<K extends ApiPathKey>(
  key: K,
  params: Record<string, string | number | boolean | string[]> = {},
  host?: 'local' | string,
): string {
  return generateRoute(apiPaths, key, params, host);
}