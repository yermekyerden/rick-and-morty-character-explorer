import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.tsx';
import { getRootElement } from './bootstrap/getRootElement';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { APP_ROUTER_BASENAME } from './router/routerConfig';
import './index.css';

createRoot(getRootElement()).render(
  <StrictMode>
    <BrowserRouter basename={APP_ROUTER_BASENAME}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>
);
