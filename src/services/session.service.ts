import jwt_decode from 'jwt-decode';
import getTokenStorage from '../utils/getTokenStorage';
import toastMsg, { ToastType } from '../utils/toastMsg';
import HttpClient from './httpClient';

export async function loginUser(
  cpf: string,
  password: string,
  setIsAuthenticated: (x: boolean) => void,
  setIsAdmin: (x: boolean) => void
): Promise<void> {
  const obj = {
    cpf,
    password,
  };

  await HttpClient.api
    .post('/session/', obj)
    .then((response) => {
      const token = response.data;
      const decoded: { auth: string } = jwt_decode(token);
      const authorization = decoded.auth;
      if (authorization === 'true') setIsAdmin(true);
      localStorage.setItem('TOKEN_KEY', token);
      setIsAuthenticated(true);
      HttpClient.api.defaults.headers.common.Authorization = getTokenStorage();
      toastMsg(ToastType.Success, 'Logged in');
    })
    .catch((error) => {
      toastMsg(ToastType.Error, error.response.data.message);
    });
}

export function logoutUser(): void {
  localStorage.removeItem('TOKEN_KEY');
  document.location.reload();
}

export async function validateToken(): Promise<boolean> {
  let isValid = false;
  const token = localStorage.getItem('TOKEN_KEY');

  if (token) {
    const decoded: { exp: number } = jwt_decode(token);
    const expiration = decoded.exp;
    if (Date.now() > expiration * 1000) {
      localStorage.removeItem('TOKEN_KEY');
    }

    await HttpClient.api
      .post('/sessions/validate')
      .then((res: { data: boolean }) => {
        isValid = res.data;
      })
      .catch(() => {
        isValid = false;
      });
    return isValid;
  }
  return isValid;
}
