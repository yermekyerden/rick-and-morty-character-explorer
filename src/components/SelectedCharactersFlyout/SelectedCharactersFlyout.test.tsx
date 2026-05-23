import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { APP_MESSAGES } from '../../constants/messages';
import { useSelectedCharactersStore } from '../../store/selectedCharactersStore';
import { testCharacterCard } from '../../test/testCharacters';
import SelectedCharactersFlyout from './SelectedCharactersFlyout';

describe('SelectedCharactersFlyout', () => {
  beforeEach(() => {
    useSelectedCharactersStore.setState({
      selectedCharactersById: {},
    });
  });

  it('renders nothing when no characters are selected', () => {
    render(<SelectedCharactersFlyout />);

    expect(
      screen.queryByLabelText(APP_MESSAGES.selectedCharacters.title)
    ).not.toBeInTheDocument();
  });

  it('renders selected character count when characters are selected', () => {
    useSelectedCharactersStore
      .getState()
      .toggleCharacterSelection(testCharacterCard);

    render(<SelectedCharactersFlyout />);

    expect(
      screen.getByText(APP_MESSAGES.selectedCharacters.summary(1))
    ).toBeVisible();

    expect(
      screen.getByRole('button', {
        name: APP_MESSAGES.selectedCharacters.unselectAll,
      })
    ).toBeVisible();

    expect(
      screen.getByRole('button', {
        name: APP_MESSAGES.selectedCharacters.download,
      })
    ).toBeDisabled();
  });

  it('clears selected characters when user clicks unselect all', async () => {
    const user = userEvent.setup();

    useSelectedCharactersStore
      .getState()
      .toggleCharacterSelection(testCharacterCard);

    render(<SelectedCharactersFlyout />);

    await user.click(
      screen.getByRole('button', {
        name: APP_MESSAGES.selectedCharacters.unselectAll,
      })
    );

    expect(
      useSelectedCharactersStore
        .getState()
        .isCharacterSelected(testCharacterCard.id)
    ).toBe(false);

    expect(
      screen.queryByLabelText(APP_MESSAGES.selectedCharacters.title)
    ).not.toBeInTheDocument();
  });
});
