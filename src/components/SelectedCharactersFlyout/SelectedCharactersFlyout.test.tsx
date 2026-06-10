import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { APP_MESSAGES } from '../../constants/messages';
import { useSelectedCharactersStore } from '../../store/selectedCharactersStore';
import { testCharacterCard } from '../../test/testCharacters';
import {
  createSelectedCharactersCsv,
  createSelectedCharactersCsvFileName,
} from '../../utils/createSelectedCharactersCsv';
import { downloadCsvFile } from '../../utils/downloadCsvFile';
import SelectedCharactersFlyout from './SelectedCharactersFlyout';

vi.mock('../../utils/createSelectedCharactersCsv', () => ({
  createSelectedCharactersCsv: vi.fn(),
  createSelectedCharactersCsvFileName: vi.fn(),
}));

vi.mock('../../utils/downloadCsvFile', () => ({
  downloadCsvFile: vi.fn(),
}));

const createSelectedCharactersCsvMock = vi.mocked(createSelectedCharactersCsv);
const createSelectedCharactersCsvFileNameMock = vi.mocked(
  createSelectedCharactersCsvFileName
);
const downloadCsvFileMock = vi.mocked(downloadCsvFile);

describe('SelectedCharactersFlyout', () => {
  beforeEach(() => {
    useSelectedCharactersStore.setState({
      selectedCharactersById: {},
    });

    createSelectedCharactersCsvMock.mockReset();
    createSelectedCharactersCsvFileNameMock.mockReset();
    downloadCsvFileMock.mockReset();

    createSelectedCharactersCsvMock.mockReturnValue('"Name"\n"Rick Sanchez"');
    createSelectedCharactersCsvFileNameMock.mockReturnValue('1_items.csv');
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
    ).toBeEnabled();
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

  it('downloads selected characters as CSV when user clicks download', async () => {
    const user = userEvent.setup();

    useSelectedCharactersStore
      .getState()
      .toggleCharacterSelection(testCharacterCard);

    render(<SelectedCharactersFlyout />);

    await user.click(
      screen.getByRole('button', {
        name: APP_MESSAGES.selectedCharacters.download,
      })
    );

    expect(createSelectedCharactersCsvMock).toHaveBeenCalledWith(
      [testCharacterCard],
      window.location.href
    );
    expect(createSelectedCharactersCsvFileNameMock).toHaveBeenCalledWith(1);
    expect(downloadCsvFileMock).toHaveBeenCalledWith({
      content: '"Name"\n"Rick Sanchez"',
      fileName: '1_items.csv',
    });
  });
});
