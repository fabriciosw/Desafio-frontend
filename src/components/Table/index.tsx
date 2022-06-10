import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import IUser from '../../interfaces/IUser';
import DeleteUserButton from '../DeleteUserButtonModal';
import EditUserButton from '../EditUserButtonModal';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import formatDateBR from '../../utils/formatDateBR';

interface Props {
  users: IUser[];
  setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
}
export default function UsersTable({ users, setUsers }: Props): JSX.Element {
  const { isAdmin } = AuthenticationContext();

  return (
    <Table sx={{ minWidth: 650 }} size="small" aria-label="Tabela de usuários">
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
      <TableBody>
        {users.map((user) => (
          <TableRow hover key={user.id}>
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
        ))}
      </TableBody>
    </Table>
  );
}
