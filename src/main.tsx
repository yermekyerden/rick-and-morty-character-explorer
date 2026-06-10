import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.tsx';
import { getRootElement } from './bootstrap/getRootElement';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import QueryProvider from './query/QueryProvider';
import { APP_ROUTER_BASENAME } from './router/routerConfig';
import ThemeProvider from './theme/ThemeProvider';
import './index.css';

createRoot(getRootElement()).render(
  <StrictMode>
    <ThemeProvider>
      <QueryProvider>
        <BrowserRouter basename={APP_ROUTER_BASENAME}>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </BrowserRouter>
      </QueryProvider>
    </ThemeProvider>
  </StrictMode>
);
