import jwt_decode from 'jwt-decode';
import getTokenStorage from '../utils/getTokenStorage';
import HttpClient from './httpClient';

export function loginUser(
  event: React.FormEvent,
  cpf: string,
  password: string,
  setIsAuthenticated: (x: boolean) => void
): void {
  event.preventDefault();

  const obj = {
    cpf,
    password,
  };
  HttpClient.api
    .post('/session/', obj)

    .then((response) => {
      localStorage.setItem('TOKEN_KEY', response.data);
      setIsAuthenticated(true);
      HttpClient.api.defaults.headers.common.Authorization = getTokenStorage();
    });
  // .catch((erro) => console.log(erro))
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
