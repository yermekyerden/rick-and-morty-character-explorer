export const APP_MESSAGES = {
  app: {
    kicker: 'Rick and Morty API Explorer',
    title: 'Character Explorer',
    description:
      'Type a name, open a tiny portal, and hope the API sends back someone less dangerous than Rick.',
  },

  bootstrap: {
    rootElementMissing:
      'Portal root element was not found. Check that index.html contains <div id="root"></div>.',
  },

  search: {
    label: 'Character name',
    placeholder: 'Try Rick, Morty, Summer...',
    hint: 'Your last portal coordinates are saved in this browser.',
    button: 'Search',
  },

  pagination: {
    previous: 'Previous',
    next: 'Next',
    pageSummary: (currentPage: number, totalPages: number) =>
      `Page ${currentPage} of ${totalPages}`,
  },

  results: {
    title: 'Character results',
    status: {
      loading: 'Opening portal',
      unstable: 'Portal unstable',
      browsingPage: (currentPage: number, totalPages: number) =>
        `Browsing dimensions • Page ${currentPage} of ${totalPages}`,
      coordinatesLocked: (
        searchTerm: string,
        currentPage: number,
        totalPages: number
      ) =>
        `Coordinates locked: "${searchTerm}" • Page ${currentPage} of ${totalPages}`,
    },
    empty: 'No characters loaded yet. The portal is suspiciously quiet.',
  },

  characterCard: {
    openDetails: 'Open dossier',
    openDetailsLabel: (characterName: string) =>
      `Open dossier for ${characterName}`,
  },

  characterDetails: {
    title: 'Character dossier',
    loading: 'Loading dossier from another dimension...',
    close: 'Close',
    closeLabel: 'Close character dossier',
    errorTitle: 'Dossier signal lost',
    fields: {
      status: 'Status',
      species: 'Species',
      type: 'Type',
      gender: 'Gender',
      origin: 'Origin',
      location: 'Location',
      episodes: 'Episodes',
      created: 'Created',
    },
  },

  selectedCharacters: {
    summary: (count: number) =>
      count === 1 ? '1 character selected' : `${count} characters selected`,
    title: 'Selected dossiers',
    description:
      'Selected characters stay in the current app state while you navigate between pages.',
    unselectAll: 'Unselect all',
    download: 'Download CSV',
    downloadUnavailable: 'CSV export will be available in the next step.',
  },

  theme: {
    label: 'Theme',
    switchToLightDimension: 'Switch to light dimension',
    switchToDarkDimension: 'Switch to dark dimension',
    contextMissing:
      'Theme context is not available. Wrap the application with ThemeProvider.',
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
    networkOrRateLimit:
      'The portal refused the request. You may be switching dimensions too fast. Wait a moment and try again.',
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
