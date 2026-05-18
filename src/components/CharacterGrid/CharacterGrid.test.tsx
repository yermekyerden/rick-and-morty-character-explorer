import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { APP_MESSAGES } from '../../constants/messages';
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

  it('passes selected character id to parent callback', async () => {
    const user = userEvent.setup();
    const onCharacterSelect = vi.fn();

    render(
      <CharacterGrid
        characters={testCharacterCards}
        onCharacterSelect={onCharacterSelect}
      />
    );

    await user.click(
      screen.getByRole('button', {
        name: APP_MESSAGES.characterCard.openDetailsLabel('Rick Sanchez'),
      })
    );

    expect(onCharacterSelect).toHaveBeenCalledWith(1);
  });
});
