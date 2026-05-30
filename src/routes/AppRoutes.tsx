import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { PATHS } from './paths';
import RouteLayout from './RouteLayout';
import Loading from '../components/atoms/FeedBack/Loading';

const Dashboard = lazy(() => import('../pages/Dashboard'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<RouteLayout />}>
          <Route path={PATHS.Patient} element={<Dashboard />} />
        </Route>
      </Routes>
    </Suspense>
  );
}