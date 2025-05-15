import apiPaths from "~/public/api-routes.json";

type PathKey = keyof typeof apiPaths;

/**
 * Build a URL from your JSON routes, à la Ziggy.
 *
 * @param key       One of the keys in api-routes.json
 * @param params    Values to inject into `:param` placeholders,
 *                  plus any extra props become query-string entries.
 * @param absolute  If `true` (default), prefix with NEXT_PUBLIC_BOOKINGS_API_HOST;
 *                  if `false`, return only the path+query.
 */
export function route<K extends PathKey>(
  key: K,
  params: Record<string, string | number | boolean | string[]> = {},
  absolute: boolean = true
): string {
  const template = apiPaths[key] as string;
  if (!template) {
    throw new Error(`Unknown route "${String(key)}".`);
  }

  // 1) Inject path params, error on missing
  const used = new Set<string>();
  const path = template.replace(/:([A-Za-z0-9_]+)/g, (_, name: string) => {
    if (params[name] == null) {
      throw new Error(
        `Missing required route parameter "${name}" for "${key}".`
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

  // 3) Return absolute or relative
  if (absolute) {
    const host = process.env.NEXT_PUBLIC_BOOKINGS_API_HOST || "";
    return host.replace(/\/+$/, "") + fullPath;
  }
  return fullPath;
}
