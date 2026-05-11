import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { testCharacterCard } from '../../test/testCharacters';
import CharacterCard from './CharacterCard';

describe('CharacterCard', () => {
  it('renders character image, name, status and description', () => {
    const expectedName = testCharacterCard.name;
    const expectedStatus = testCharacterCard.status;
    const expectedDescription = testCharacterCard.description;
    const expectedImageUrl = testCharacterCard.imageUrl;

    render(<CharacterCard character={testCharacterCard} />);

    const characterImage = screen.getByRole('img', {
      name: expectedName,
    });

    expect(screen.getByRole('heading', { name: expectedName })).toBeVisible();
    expect(screen.getByText(expectedStatus)).toBeVisible();
    expect(screen.getByText(expectedDescription)).toBeVisible();
    expect(characterImage).toHaveAttribute('src', expectedImageUrl);
  });
});
