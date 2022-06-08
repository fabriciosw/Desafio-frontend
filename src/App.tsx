import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Authentication } from './contexts/AuthenticationContext';
import { ToggleMenuProvider } from './contexts/ToggleMenuContext';
import Routes from './routes';

const App: React.FunctionComponent = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] =  useState<boolean>(false);
  return (
    <Authentication.Provider value={{ isAuthenticated, setIsAuthenticated, isAdmin, setIsAdmin }}>
      <Router>
        <ToggleMenuProvider>
          <Routes />
        </ToggleMenuProvider>
      </Router>
    </Authentication.Provider>
  );
};

export default App;
