import React from 'react';
import { Routes as RoutesRouter, Route, Navigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Login from '../pages/Login';
import Home from '../pages/Home';
import { AuthenticationContext } from '../contexts/AuthenticationContext';

const Routes: React.FunctionComponent = () => {
  const { isAuthenticated } = AuthenticationContext();
  const renderRoutes = (): React.ReactNode => (
    <RoutesRouter>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/home" replace /> : <Login />} />
      <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />} />
      <Route path="*" element={isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />} />
    </RoutesRouter>
  );

  return (
    <div className="d-flex">
      <div className="d-flex flex-column p-0 w-100">
        <main>
          <React.Suspense fallback={<Loader />}>{renderRoutes()}</React.Suspense>
        </main>
      </div>
    </div>
  );
};

Routes.defaultProps = { public: false };

export default Routes;
