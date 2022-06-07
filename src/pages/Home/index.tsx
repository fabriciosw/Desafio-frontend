import React, { useEffect, useState } from 'react';
import IUser from '../../interfaces/IUser';
import { logoutUser } from '../../services/session.service';
import { getUsers } from '../../services/users.service';
import CreateUserButton from '../../components/CreateUserButton';
import DeleteUserButton from '../../components/DeleteUserButton';
import EditUserButton from '../../components/EditUserButton';

export default function Home(): JSX.Element {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    getUsers(setUsers);
  }, []);
  return (
    <>
      <button type="button" onClick={() => logoutUser()}>
        Logout
      </button>
      <CreateUserButton setUsers={setUsers} />
      {users.map((user) => (
        <>
          <p>{user.name}</p>
          <p>{user.obs}</p>
          <p>{`${user.permission}`}</p>
          <DeleteUserButton setUsers={setUsers} id={user.id} />
          <EditUserButton user={user} setUsers={setUsers} />
        </>
      ))}
    </>
  );
}
