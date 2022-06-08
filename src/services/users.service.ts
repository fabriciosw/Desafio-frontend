import HttpClient from './httpClient';
import IUser from '../interfaces/IUser';
import toastMsg, { ToastType } from '../utils/toastMsg';
import formatDateForDatabase from '../utils/formatDateForDatabase';

export function getUsers(setUsers: (x: IUser[]) => void): void {
  HttpClient.api.get<IUser[]>('/users').then((res: { data: Array<IUser> }) => setUsers(res.data));
}

export async function user(id: string): Promise<IUser> {
  const { data } = await HttpClient.api.get(`/users/${id}`);
  return data;
}

export async function createUser(
  event: React.FormEvent,
  name: string,
  cpf: string,
  unformatedDate: string,
  password: string,
  obsReq: string,
  permissionString: string,
  setUsers: (x: IUser[]) => void
): Promise<null | void> {
  event.preventDefault();
  let permission = false;
  if (permissionString === 'true') permission = true;

  if (cpf.length !== 11) {
    toastMsg(ToastType.Error, 'CPF inválido');
    return null;
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
  await HttpClient.api
    .post('/users/', obj)
    .then(() => {
      toastMsg(ToastType.Success, 'Usuário criado!');
      getUsers(setUsers);
    })
    .catch(() => {
      toastMsg(ToastType.Error, 'Erro ao criar usuário');
      return null;
    });
  return null;
}

export async function updateUser(
  event: React.FormEvent,
  id: number,
  obsReq: string,
  permissionString: string,
  setUsers: (x: IUser[]) => void
): Promise<void> {
  event.preventDefault();
  let permission = false;
  if (permissionString === 'true') permission = true;

  let obs = obsReq;

  if (obsReq === '') obs = '-';

  const obj = {
    obs,
    permission,
  };
  await HttpClient.api.put(`/users/${id}`, obj).then(() => {
    toastMsg(ToastType.Success, 'Usuário alterado!');
    getUsers(setUsers);
  });
}

export function deleteUser(event: React.FormEvent, id: number, setUsers: (x: IUser[]) => void): void {
  event.preventDefault();
  HttpClient.api.delete(`/users/${id}`).then((response) => {
    toastMsg(ToastType.Error, response.data);
    getUsers(setUsers);
  });
}
