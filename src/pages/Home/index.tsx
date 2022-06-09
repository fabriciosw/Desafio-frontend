import React, { useEffect, useState } from 'react';
import IUser from '../../interfaces/IUser';
import { logoutUser } from '../../services/session.service';
import { getUsers } from '../../services/users.service';
import CreateUserButton from '../../components/CreateUserButtonModal';
import toastMsg, { ToastType } from '../../utils/toastMsg';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import UsersTable from '../../components/Table';
import './style.scss';

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
      <section className="content">
        <h3>Usuários</h3>
        <div className="buttons">
          {isAdmin ? <CreateUserButton setUsers={setUsers} /> : ''}
          <button className="logout" type="button" onClick={() => logoutUser()}>
            Logout
          </button>
        </div>

        <UsersTable users={users} setUsers={setUsers} />
      </section>
    </>
  );
}
