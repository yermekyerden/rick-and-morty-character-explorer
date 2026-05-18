import { Route, Routes } from 'react-router';
import AppLayout from './layouts/AppLayout/AppLayout';
import AboutPage from './pages/AboutPage/AboutPage';
import ExplorerPage from './pages/ExplorerPage/ExplorerPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<ExplorerPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
