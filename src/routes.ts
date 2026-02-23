import { createBrowserRouter } from 'react-router';
import { Layout } from './components/pages/Layout';
import { NotFound } from './components/pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [],
  },
  {
    path: '/*',
    Component: NotFound,
  },
]);
