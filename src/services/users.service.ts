import HttpClient from './httpClient';
import IUser from '../interfaces/IUser';
import formatDateForDatabase from '../utils/formatDateForDatabase';

export async function getUsers(): Promise<IUser[]> {
  const { data } = await HttpClient.api.get<IUser[]>('/users');
  return data;
}

export async function createUser(
  name: string,
  cpf: string,
  unformatedDate: string,
  password: string,
  obsReq: string,
  permissionString: string
): Promise<string> {
  let permission = false;
  if (permissionString === 'true') permission = true;

  if (cpf.length !== 11) {
    return 'CPF inválido';
  }
  let obs = obsReq;

  if (obsReq === '') obs = '-';

  const birthDate = formatDateForDatabase(unformatedDate);
  const obj = {
    name,
    cpf,
    birthDate,
    password,
    obs,
    permission,
  };
  const { data } = await HttpClient.api.post('/users/', obj);
  return data;
}

export async function updateUser(id: number, obsReq: string, permissionString: string): Promise<string> {
  let permission = false;
  if (permissionString === 'true') permission = true;

  let obs = obsReq;

  if (obsReq === '') obs = '-';

  const obj = {
    obs,
    permission,
  };
  const { data } = await HttpClient.api.put(`/users/${id}`, obj);
  return data;
}

export async function deleteUser(id: number): Promise<string> {
  const { data } = await HttpClient.api.delete(`/users/${id}`);
  return data;
}
