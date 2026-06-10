import { describe, expect, it } from 'vitest';
import { CHARACTER_QUERY_KEYS } from './queryKeys';

describe('CHARACTER_QUERY_KEYS', () => {
  it('creates root character query key', () => {
    expect(CHARACTER_QUERY_KEYS.all).toEqual(['characters']);
  });

  it('creates character pages query key', () => {
    expect(CHARACTER_QUERY_KEYS.pages()).toEqual(['characters', 'pages']);
  });

  it('creates normalized character page query key', () => {
    expect(
      CHARACTER_QUERY_KEYS.page({
        page: 2,
        searchTerm: '  Rick  ',
      })
    ).toEqual([
      'characters',
      'pages',
      {
        page: 2,
        searchTerm: 'Rick',
      },
    ]);
  });

  it('creates character details root query key', () => {
    expect(CHARACTER_QUERY_KEYS.detailsRoot()).toEqual([
      'characters',
      'details',
    ]);
  });

  it('creates character details query key', () => {
    expect(CHARACTER_QUERY_KEYS.details(25)).toEqual([
      'characters',
      'details',
      25,
    ]);
  });
});
