import HttpClient from './httpClient';
import IUser from '../interfaces/IUser';

export async function getUsers(): Promise<IUser[]> {
  const { data } = await HttpClient.api.get<IUser[]>('/users');
  return data;
}

export async function createUser(
  name: string,
  cpf: string,
  birthDate: Date,
  password: string,
  obs: string,
  permissionString: string
): Promise<{ message: string }> {
  let permission = false;
  if (permissionString === 'true') permission = true;

  if (cpf.length !== 14) {
    return { message: 'CPF inválido' };
  }

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

export async function updateUser(id: number, obs: string, permissionString: string): Promise<{ message: string }> {
  let permission = false;
  if (permissionString === 'true') permission = true;

  const obj = {
    obs,
    permission,
  };
  const { data } = await HttpClient.api.put(`/users/${id}`, obj);
  return data;
}

export async function deleteUser(id: number): Promise<void> {
  const { data } = await HttpClient.api.delete(`/users/${id}`);
  return data;
}
