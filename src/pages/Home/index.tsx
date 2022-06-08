import React, { useEffect, useState } from 'react';
import { Table, TableCell, TableHead, TableRow } from '@mui/material';
import IUser from '../../interfaces/IUser';
import { logoutUser } from '../../services/session.service';
import { getUsers } from '../../services/users.service';
import CreateUserButton from '../../components/CreateUserButton';
import DeleteUserButton from '../../components/DeleteUserButton';
import EditUserButton from '../../components/EditUserButton';
import toastMsg, { ToastType } from '../../utils/toastMsg';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import formatDateBR from '../../utils/formatDateBR';

export default function Home(): JSX.Element {
  const { isAdmin } = AuthenticationContext();
  const [users, setUsers] = useState<IUser[]>([]);

  const fetchUsers = async (): Promise<void> => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      toastMsg(ToastType.Error, (error as Error).message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <button type="button" onClick={() => logoutUser()}>
        Logout
      </button>

      {isAdmin ? <CreateUserButton setUsers={setUsers} /> : ''}
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Nome</TableCell>
            <TableCell align="center">Data de nascimento</TableCell>
            <TableCell align="center">CPF</TableCell>
            <TableCell align="center">Permissão</TableCell>
            <TableCell align="center">Observação</TableCell>
            {isAdmin ? <TableCell align="center">Gerenciar</TableCell> : ''}
          </TableRow>
        </TableHead>
        {users.map((user) => (
          <>
            <TableRow hover key={user.cpf}>
              <TableCell align="center">{user.name}</TableCell>
              <TableCell align="center">{formatDateBR(user.birthDate)}</TableCell>
              <TableCell align="center">{user.cpf}</TableCell>
              <TableCell align="center">{user.permission ? 'Administrador' : 'Colaborador'}</TableCell>
              <TableCell align="center" sx={{ maxWidth: 400 }}>
                {user.obs}
              </TableCell>
              {isAdmin ? (
                <TableCell align="center">
                  <DeleteUserButton id={user.id} setUsers={setUsers} />
                  <EditUserButton user={user} setUsers={setUsers} />
                </TableCell>
              ) : (
                ''
              )}
            </TableRow>
          </>
        ))}
      </Table>
    </>
  );
}
