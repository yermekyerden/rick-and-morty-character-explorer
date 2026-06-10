import { Route, Routes } from 'react-router';
import CharacterDetailsPanel from './components/CharacterDetailsPanel/CharacterDetailsPanel';
import AppLayout from './layouts/AppLayout/AppLayout';
import AboutPage from './pages/AboutPage/AboutPage';
import ExplorerPage from './pages/ExplorerPage/ExplorerPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { APP_ROUTES } from './router/routes';

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path={APP_ROUTES.explorer} element={<ExplorerPage />}>
          <Route index element={<CharacterDetailsPanel />} />
        </Route>

        <Route path={APP_ROUTES.about} element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
