import { createContext, useContext } from 'react';

type Props = {
  isAuthenticated: boolean;
  setIsAuthenticated: (x: boolean) => void;
};

export const Authentication = createContext<Props>({} as Props);

export const AuthenticationContext = (): Props => useContext(Authentication);
