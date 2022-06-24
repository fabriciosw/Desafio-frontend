import React from 'react';
import { Routes as RoutesRouter, Route, Navigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Error from '../pages/Error';
import { AuthenticationContext } from '../contexts/AuthenticationContext';

const Routes: React.FunctionComponent = () => {
  const { isAuthenticated } = AuthenticationContext();

  const PrivateRoute= (children: React.ReactElement): React.ReactElement => {

    if (!isAuthenticated)
      return <Navigate to="/login"/>

  return children;
};

  return (
    <div className="d-flex">
      <div className="d-flex flex-column p-0 w-100">
        <main>
          <React.Suspense fallback={<Loader />}>
            <RoutesRouter>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/home" replace /> : <Login />} />
      <Route path="/home" element={PrivateRoute(<Home/>)} />
      <Route path="*" element={<Error/>} />
    </RoutesRouter>
          </React.Suspense>
        </main>
      </div>
    </div>
  );
};

Routes.defaultProps = { public: false };

export default Routes;
