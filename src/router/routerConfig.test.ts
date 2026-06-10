import { describe, expect, it } from 'vitest';
import { createRouterBasename } from './routerConfig';

describe('createRouterBasename', () => {
  it('removes trailing slash from nested base URL', () => {
    expect(createRouterBasename('/rs-react-2026/')).toBe('/rs-react-2026');
  });

  it('keeps root basename for root base URL', () => {
    expect(createRouterBasename('/')).toBe('/');
  });

  it('keeps base URL without trailing slash unchanged', () => {
    expect(createRouterBasename('/portal-lab')).toBe('/portal-lab');
  });
});
