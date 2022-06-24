import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IUser from '../../../interfaces/IUser';
import EditUserButton from '../../EditUserButtonModal';
import DeleteUserButton from '../../DeleteUserButtonModal';
import { AuthenticationContext } from '../../../contexts/AuthenticationContext';
import formatDateBR from '../../../utils/formatDateBR';

interface Props {
  user: IUser;
  setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
}

export default function TableContent({ user, setUsers }: Props): React.ReactElement {
  const { isAdmin } = AuthenticationContext();
  return (
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
  );
}
