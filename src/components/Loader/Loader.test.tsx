import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { APP_MESSAGES } from '../../constants/messages';
import { SKELETON_CARD_COUNT } from '../../constants/ui';
import Loader from './Loader';

describe('Loader', () => {
  it('renders loading message and skeleton cards', () => {
    const expectedMessage = APP_MESSAGES.loader.message;
    const expectedListName = APP_MESSAGES.loader.ariaLabel;
    const expectedSkeletonCardCount = SKELETON_CARD_COUNT;

    render(<Loader />);

    const loadingList = screen.getByRole('list', {
      name: expectedListName,
    });
    const skeletonCards = within(loadingList).getAllByRole('listitem');

    expect(screen.getByText(expectedMessage)).toBeVisible();
    expect(loadingList).toBeInTheDocument();
    expect(skeletonCards).toHaveLength(expectedSkeletonCardCount);
  });
});
