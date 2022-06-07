import React from 'react';
import { Routes as RoutesRouter, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Loader from '../components/Loader';
import Login from '../pages/Login';
import Home from '../pages/Home';
import { AuthenticationContext } from '../contexts/AuthenticationContext';

const Routes: React.FunctionComponent = () => {
  const { isAuthenticated } = AuthenticationContext();
  const renderRoutes = (): React.ReactNode => (
    <RoutesRouter>
      <Route path="/login" element={isAuthenticated ? <Home /> : <Login />} />
      <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />} />
      <Route path="*" element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />} />
    </RoutesRouter>
  );

  return (
    <div className="d-flex">
      <div className="d-flex flex-column p-0 w-100">
        <main>
          <Container fluid>
            <React.Suspense fallback={<Loader />}>{renderRoutes()}</React.Suspense>
          </Container>
        </main>
      </div>
    </div>
  );
};

Routes.defaultProps = { public: false };

export default Routes;