import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { APP_MESSAGES } from '../../constants/messages';
import NoResultsCard from './NoResultsCard';

describe('NoResultsCard', () => {
  it('renders no-results title, badge, message and hint', () => {
    const expectedMessage = APP_MESSAGES.apiErrors.notFound;

    render(<NoResultsCard message={expectedMessage} />);

    expect(
      screen.getByRole('heading', { name: APP_MESSAGES.noResults.title })
    ).toBeVisible();
    expect(screen.getByText(APP_MESSAGES.noResults.badge)).toBeVisible();
    expect(screen.getByText(expectedMessage)).toBeVisible();
    expect(screen.getByText(APP_MESSAGES.noResults.hint)).toBeVisible();
  });
});
