import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
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
});
