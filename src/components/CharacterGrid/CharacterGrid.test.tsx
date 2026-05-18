import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { testCharacterCards } from '../../test/testCharacters';
import CharacterGrid from './CharacterGrid';

describe('CharacterGrid', () => {
  it('renders all provided characters', () => {
    const expectedCharacterCount = testCharacterCards.length;

    render(<CharacterGrid characters={testCharacterCards} />);

    const characterGrid = screen.getByRole('list', {
      name: /character results/i,
    });
    const renderedCharacters = within(characterGrid).getAllByRole('listitem');

    expect(renderedCharacters).toHaveLength(expectedCharacterCount);
    expect(screen.getByRole('heading', { name: 'Rick Sanchez' })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'Morty Smith' })).toBeVisible();
  });
});
