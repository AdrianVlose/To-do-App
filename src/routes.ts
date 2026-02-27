import { createBrowserRouter } from 'react-router';
import { Layout } from './components/pages/Layout';
import { NotFound } from './components/pages/NotFound';
import { Dashboard } from './components/pages/Dashboard';
import { TaskForm } from './components/forms/TaskForm';
import { Landing } from './components/pages/Landing';
import { store } from './store/store';
import { getTasks } from './store/tasksSlice';
import { ContactForm } from './components/forms/ContactForm';
import { LoginForm } from './components/forms/LoginForm';

const getTasksForDashboard = async () => {
  store.dispatch(getTasks(1));
  return null;
};

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Landing },
      { path: 'dashboard', Component: Dashboard, loader: getTasksForDashboard },
      { path: 'contact', Component: ContactForm },
      { path: 'login', Component: LoginForm },
      { path: 'add', Component: TaskForm },
      { path: 'edit/:id', Component: TaskForm },
    ],
  },
  {
    path: '/*',
    Component: NotFound,
  },
]);
