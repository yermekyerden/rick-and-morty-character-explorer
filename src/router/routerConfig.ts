const TRAILING_SLASH_PATTERN = /\/$/;

export function createRouterBasename(baseUrl: string): string {
  const basename = baseUrl.replace(TRAILING_SLASH_PATTERN, '');

  return basename.length > 0 ? basename : '/';
}

export const APP_ROUTER_BASENAME = createRouterBasename(
  import.meta.env.BASE_URL
);
