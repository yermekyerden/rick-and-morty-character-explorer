import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { APP_MESSAGES } from '../../constants/messages';
import PaginationControls from './PaginationControls';

describe('PaginationControls', () => {
  it('renders current page summary', () => {
    render(
      <PaginationControls
        currentPage={2}
        totalPages={5}
        onPageChange={() => {}}
      />
    );

    expect(
      screen.getByText(APP_MESSAGES.pagination.pageSummary(2, 5))
    ).toBeVisible();
  });

  it('moves to previous page', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <PaginationControls
        currentPage={3}
        totalPages={5}
        onPageChange={onPageChange}
      />
    );

    await user.click(
      screen.getByRole('button', {
        name: APP_MESSAGES.pagination.previous,
      })
    );

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('moves to next page', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <PaginationControls
        currentPage={3}
        totalPages={5}
        onPageChange={onPageChange}
      />
    );

    await user.click(
      screen.getByRole('button', {
        name: APP_MESSAGES.pagination.next,
      })
    );

    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it('disables previous button on first page', () => {
    render(
      <PaginationControls
        currentPage={1}
        totalPages={5}
        onPageChange={() => {}}
      />
    );

    expect(
      screen.getByRole('button', {
        name: APP_MESSAGES.pagination.previous,
      })
    ).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(
      <PaginationControls
        currentPage={5}
        totalPages={5}
        onPageChange={() => {}}
      />
    );

    expect(
      screen.getByRole('button', {
        name: APP_MESSAGES.pagination.next,
      })
    ).toBeDisabled();
  });
});
