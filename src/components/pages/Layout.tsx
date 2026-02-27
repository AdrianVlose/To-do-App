import { Outlet } from 'react-router';
import { Header } from '../headers/Header.tsx';

export function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
