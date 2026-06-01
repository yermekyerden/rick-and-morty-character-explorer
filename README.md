# Character Explorer

Rick and Morty character explorer built with React, TypeScript, React Router, Zustand, TanStack Query, Context API, and Vitest.

## Features

- Character search with saved last query
- URL-synced pagination
- Cached API querying with TanStack Query
- Configurable query cache TTL through environment variable
- Manual data refresh with cache invalidation
- Character details panel with cached dossier data
- Selected characters with bottom flyout
- CSV export for selected characters
- Theme switcher with Context API
- About and 404 pages
- Error boundary
- Responsive portal-themed UI

## Architecture

The app uses a pragmatic layered React SPA structure:

- API layer for Rick and Morty requests
- DTO-to-model mappers
- TanStack Query for server state
- Zustand for selected characters state
- Context API for theme personalization
- Custom hooks for URL and browser state
- CSS Modules for component styling

## Stack

- React
- TypeScript
- React Router
- Zustand
- TanStack Query
- Context API
- Vite
- Vitest
- React Testing Library
- CSS Modules

## Environment

```env
VITE_QUERY_CACHE_TTL_MS=300000
```

## Runtime

Recommended runtime: Node.js 22.

## Scripts

```bash
npm ci
npm run dev
npm run lint
npm run test
npm run test:coverage
npm run build
```

## Coverage

```text
Statements: 93.95%
Branches:   87.24%
Functions:  98.8%
Lines:      93.93%
```

## Author

Yermek Yerdenov

[RS School React Course](https://rs.school/courses/reactjs)
