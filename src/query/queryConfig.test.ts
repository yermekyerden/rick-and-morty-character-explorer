import { describe, expect, it } from 'vitest';
import {
  DEFAULT_QUERY_CACHE_TTL_IN_MS,
  parseQueryCacheTtlInMs,
} from './queryConfig';

describe('parseQueryCacheTtlInMs', () => {
  it('returns configured cache TTL when value is valid', () => {
    expect(parseQueryCacheTtlInMs('1000')).toBe(1000);
  });

  it('truncates decimal cache TTL value', () => {
    expect(parseQueryCacheTtlInMs('1500.75')).toBe(1500);
  });

  it('returns default cache TTL when value is missing', () => {
    expect(parseQueryCacheTtlInMs(undefined)).toBe(
      DEFAULT_QUERY_CACHE_TTL_IN_MS
    );
  });

  it('returns default cache TTL when value is not finite', () => {
    expect(parseQueryCacheTtlInMs('Infinity')).toBe(
      DEFAULT_QUERY_CACHE_TTL_IN_MS
    );
  });

  it('returns default cache TTL when value is negative', () => {
    expect(parseQueryCacheTtlInMs('-1')).toBe(DEFAULT_QUERY_CACHE_TTL_IN_MS);
  });
});
