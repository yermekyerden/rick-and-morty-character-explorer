import { afterEach, describe, expect, it } from 'vitest';
import { APP_MESSAGES } from '../constants/messages';
import { getRootElement } from './getRootElement';

describe('getRootElement', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('returns root element when it exists', () => {
    document.body.innerHTML = '<div id="root"></div>';

    expect(getRootElement()).toBe(document.getElementById('root'));
  });

  it('throws clear error when root element is missing', () => {
    expect(() => getRootElement()).toThrow(
      APP_MESSAGES.bootstrap.rootElementMissing
    );
  });
});
