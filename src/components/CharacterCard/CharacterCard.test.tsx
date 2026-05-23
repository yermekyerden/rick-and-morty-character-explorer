import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { APP_MESSAGES } from '../../constants/messages';
import { testCharacterCard } from '../../test/testCharacters';
import CharacterCard from './CharacterCard';

describe('CharacterCard', () => {
  it('renders character image, name, status and structured dossier fields', () => {
    render(<CharacterCard character={testCharacterCard} />);

    const characterImage = screen.getByRole('img', {
      name: testCharacterCard.name,
    });

    expect(
      screen.getByRole('article', {
        name: `${testCharacterCard.name} character dossier`,
      })
    ).toBeVisible();
    expect(
      screen.getByRole('heading', { name: testCharacterCard.name })
    ).toBeVisible();
    expect(screen.getByText(testCharacterCard.status)).toBeVisible();
    expect(screen.getByText('Species')).toBeVisible();
    expect(screen.getByText(testCharacterCard.species)).toBeVisible();
    expect(screen.getByText('Gender')).toBeVisible();
    expect(screen.getByText(testCharacterCard.gender)).toBeVisible();
    expect(screen.getByText('Location')).toBeVisible();
    expect(screen.getByText(testCharacterCard.locationName)).toBeVisible();
    expect(characterImage).toHaveAttribute('src', testCharacterCard.imageUrl);
  });

  it('calls onSelect with character id when user opens dossier', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(<CharacterCard character={testCharacterCard} onSelect={onSelect} />);

    await user.click(
      screen.getByRole('button', {
        name: APP_MESSAGES.characterCard.openDetailsLabel(
          testCharacterCard.name
        ),
      })
    );

    expect(onSelect).toHaveBeenCalledWith(testCharacterCard.id);
  });

  it('calls onSelectionToggle without opening dossier when checkbox is clicked', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const onSelectionToggle = vi.fn();

    render(
      <CharacterCard
        character={testCharacterCard}
        onSelect={onSelect}
        onSelectionToggle={onSelectionToggle}
      />
    );

    await user.click(
      screen.getByRole('checkbox', {
        name: `Select ${testCharacterCard.name}`,
      })
    );

    expect(onSelectionToggle).toHaveBeenCalledWith(testCharacterCard);
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('opens dossier when user clicks the card outside checkbox', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(<CharacterCard character={testCharacterCard} onSelect={onSelect} />);

    await user.click(
      screen.getByRole('article', {
        name: `${testCharacterCard.name} character dossier`,
      })
    );

    expect(onSelect).toHaveBeenCalledWith(testCharacterCard.id);
  });

  it('marks checkbox as checked when character is selected', () => {
    render(
      <CharacterCard
        character={testCharacterCard}
        isSelected
        onSelectionToggle={() => {}}
      />
    );

    expect(
      screen.getByRole('checkbox', {
        name: `Select ${testCharacterCard.name}`,
      })
    ).toBeChecked();
  });
});
