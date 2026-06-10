import { afterEach, describe, expect, it, vi } from 'vitest';
import { delay } from './delay';

describe('delay', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('resolves after provided delay', async () => {
    const delayInMilliseconds = 300;

    vi.useFakeTimers();

    const delayPromise = delay(delayInMilliseconds);
    const resolvedSpy = vi.fn();

    delayPromise.then(resolvedSpy);

    await vi.advanceTimersByTimeAsync(delayInMilliseconds);

    expect(resolvedSpy).toHaveBeenCalledTimes(1);
  });
});
