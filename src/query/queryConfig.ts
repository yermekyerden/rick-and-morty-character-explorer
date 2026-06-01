const DEFAULT_QUERY_CACHE_TTL_IN_MS = 300_000;
const MIN_QUERY_CACHE_TTL_IN_MS = 0;

function parseQueryCacheTtl(cacheTtl: string | undefined): number {
  const parsedCacheTtl = Number(cacheTtl);

  if (!Number.isFinite(parsedCacheTtl)) {
    return DEFAULT_QUERY_CACHE_TTL_IN_MS;
  }

  if (parsedCacheTtl < MIN_QUERY_CACHE_TTL_IN_MS) {
    return DEFAULT_QUERY_CACHE_TTL_IN_MS;
  }

  return Math.trunc(parsedCacheTtl);
}

export const QUERY_CACHE_TTL_IN_MS = parseQueryCacheTtl(
  import.meta.env.VITE_QUERY_CACHE_TTL_MS
);
