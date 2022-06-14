import React, { useEffect, useState } from 'react';
import IUser from '../../interfaces/IUser';
import { getUsers } from '../../services/users.service';
import CreateUserButton from '../../components/CreateUserButtonModal';
import toastMsg, { ToastType } from '../../utils/toastMsg';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import UsersTable from '../../components/Table';
import './style.scss';
import Header from '../../components/Header';
import Text from '../../components/Text';

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
      <Header />

      <section className="content">
        <Text as="h3" weight={500}>
          Lista de usuários
        </Text>
        <div className="buttons">{isAdmin ? <CreateUserButton setUsers={setUsers} /> : ''}</div>

        <UsersTable users={users} setUsers={setUsers} />
      </section>
    </>
  );
}
