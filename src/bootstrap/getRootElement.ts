import { APP_MESSAGES } from '../constants/messages';

export function getRootElement(): HTMLElement {
  const rootElement = document.getElementById('root');

  if (rootElement === null) {
    throw new Error(APP_MESSAGES.bootstrap.rootElementMissing);
  }

  return rootElement;
}
