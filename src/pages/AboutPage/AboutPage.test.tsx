import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AboutPage from './AboutPage';

describe('AboutPage', () => {
  it('renders app description, author information and course link', () => {
    render(<AboutPage />);

    expect(
      screen.getByRole('heading', {
        name: /about character explorer/i,
      })
    ).toBeVisible();

    expect(
      screen.getByText(/opens a small portal into the rick and morty api/i)
    ).toBeVisible();

    expect(
      screen.getByRole('heading', {
        name: /yermek yerden/i,
      })
    ).toBeVisible();

    expect(
      screen.getByText(/a software engineer from kazakhstan/i)
    ).toBeVisible();

    expect(
      screen.getByRole('link', {
        name: /open rs school react course/i,
      })
    ).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
  });
});
