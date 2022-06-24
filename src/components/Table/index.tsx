import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import IUser from '../../interfaces/IUser';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import TableContent from './TableContent';

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
          <TableContent user={user} setUsers={ setUsers } />
        ))}
      </TableBody>
    </Table>
  );
}
