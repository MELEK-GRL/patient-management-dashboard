import { Outlet } from 'react-router-dom';
import MainLayout from '../components/templates/MainLayout/MainLayout';

export default function RouteLayout() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
