import React, { useEffect, useState } from 'react';
import IUser from '../../interfaces/IUser';
import { logoutUser } from '../../services/session.service';
import { getUsers } from '../../services/users.service';
import CreateUserButton from '../../components/CreateUserButton';
import DeleteUserButton from '../../components/DeleteUserButton';
import EditUserButton from '../../components/EditUserButton';
import toastMsg, { ToastType } from '../../utils/toastMsg';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';

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
      {users.map((user) => (
        <>
          <p>{user.name}</p>
          <p>{user.obs}</p>
          <p>{`${user.permission}`}</p>
          {isAdmin ? <DeleteUserButton id={user.id} setUsers={setUsers} /> : ''}
          {isAdmin ? <EditUserButton user={user} setUsers={setUsers} /> : ''}
        </>
      ))}
    </>
  );
}
