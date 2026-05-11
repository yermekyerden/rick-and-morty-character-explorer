import { render, screen } from '@testing-library/react';
import type { ReactElement } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { APP_MESSAGES } from '../../constants/messages';
import ErrorBoundary from './ErrorBoundary';

function BrokenComponent(): ReactElement {
  throw new Error(APP_MESSAGES.errorBoundary.simulatedError);
}

describe('ErrorBoundary', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders children when no error is thrown', () => {
    const expectedContent = 'Stable portal content';

    render(
      <ErrorBoundary>
        <p>{expectedContent}</p>
      </ErrorBoundary>
    );

    expect(screen.getByText(expectedContent)).toBeVisible();
  });

  it('renders fallback UI when a child component throws an error', () => {
    const expectedKicker = APP_MESSAGES.errorBoundary.kicker;
    const expectedTitle = APP_MESSAGES.errorBoundary.title;
    const expectedText = APP_MESSAGES.errorBoundary.text;
    const expectedReloadButton = APP_MESSAGES.errorBoundary.reloadButton;

    vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(expectedKicker)).toBeVisible();
    expect(screen.getByRole('heading', { name: expectedTitle })).toBeVisible();
    expect(screen.getByText(expectedText)).toBeVisible();
    expect(
      screen.getByRole('button', { name: expectedReloadButton })
    ).toBeVisible();
  });

  it('logs caught error to console', () => {
    const expectedConsolePrefix = APP_MESSAGES.errorBoundary.consolePrefix;

    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    );

    expect(consoleError).toHaveBeenCalledWith(
      expectedConsolePrefix,
      expect.any(Error),
      expect.objectContaining({
        componentStack: expect.any(String),
      })
    );
  });
});
