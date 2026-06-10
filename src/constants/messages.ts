export const APP_MESSAGES = {
  app: {
    kicker: 'Rick and Morty API Explorer',
    title: 'Character Explorer',
    description:
      'Type a name, open a tiny portal, and hope the API sends back someone less dangerous than Rick.',
  },

  search: {
    label: 'Character name',
    placeholder: 'Try Rick, Morty, Summer...',
    hint: 'Your last portal coordinates are saved in this browser.',
    button: 'Search',
  },

  results: {
    title: 'Character results',
    status: {
      loading: 'Opening portal',
      unstable: 'Portal unstable',
      firstPage: 'Showing first page',
      coordinatesLocked: (searchTerm: string) =>
        `Coordinates locked: "${searchTerm}"`,
    },
    empty: 'No characters loaded yet. The portal is suspiciously quiet.',
  },

  loader: {
    message: 'Loading characters from another dimension...',
    ariaLabel: 'Loading characters',
  },

  noResults: {
    title: 'No characters found',
    badge: 'No signal',
    hint: 'Try another name like Rick, Morty, Summer, or Beth.',
  },

  apiErrors: {
    notFound:
      'No characters found for this search. Maybe the portal opened into an empty dimension.',
    generic: 'Could not load characters from the API. Please try again later.',
    unknown: 'Something went wrong while loading characters.',
  },

  errorBoundary: {
    simulatedError: 'Simulated application error triggered by test button.',
    consolePrefix: 'Application error caught by ErrorBoundary:',
    kicker: 'Emergency shutdown',
    title: 'The portal collapsed',
    text: 'A rendering error was caught by the application boundary. Reload the page to reopen the portal and continue exploring characters.',
    reloadButton: 'Reload app',
  },

  errorTest: {
    button: 'Trigger error',
  },
} as const;
