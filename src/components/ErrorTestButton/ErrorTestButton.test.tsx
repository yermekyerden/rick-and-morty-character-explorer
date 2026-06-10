import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { APP_MESSAGES } from '../../constants/messages';
import ErrorTestButton from './ErrorTestButton';

describe('ErrorTestButton', () => {
  it('calls onTriggerError when user clicks the button', async () => {
    const user = userEvent.setup();
    const onTriggerError = vi.fn();

    render(<ErrorTestButton onTriggerError={onTriggerError} />);

    await user.click(
      screen.getByRole('button', {
        name: APP_MESSAGES.errorTest.button,
      })
    );

    expect(onTriggerError).toHaveBeenCalledTimes(1);
  });
});
