import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { testCharacterCards } from '../../test/testCharacters';
import CharacterList from './CharacterList';

describe('CharacterList', () => {
  it('renders all provided characters', () => {
    const expectedCharacterCount = testCharacterCards.length;

    render(<CharacterList characters={testCharacterCards} />);

    const characterList = screen.getByRole('list');
    const renderedCharacters = within(characterList).getAllByRole('listitem');

    expect(renderedCharacters).toHaveLength(expectedCharacterCount);
    expect(screen.getByRole('heading', { name: 'Rick Sanchez' })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'Morty Smith' })).toBeVisible();
  });
});
