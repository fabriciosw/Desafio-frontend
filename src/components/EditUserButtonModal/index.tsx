import React, { Dispatch, SetStateAction, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import style from './styles.module.scss';
import IUser from '../../interfaces/IUser';
import formatDateBR from '../../utils/formatDateBR';
import toastMsg, { ToastType } from '../../utils/toastMsg';
import { getUsers, updateUser } from '../../services/users.service';

interface Props {
  user: IUser;
  setUsers: Dispatch<SetStateAction<IUser[]>>;
}
export default function EditUserButton({ user, setUsers }: Props): JSX.Element {
  const [open, setOpen] = useState(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  interface UpdateUser {
    obs: string;
    permission: string;
  }
  const fetchUsers = async (): Promise<void> => {
    try {
      const data = await getUsers();
      setUsers(data);
      handleClose();
    } catch (error) {
      toastMsg(ToastType.Error, (error as Error).message);
    }
  };
  const updateUserHandler = async (event: React.FormEvent, { obs, permission }: UpdateUser): Promise<void> => {
    event.preventDefault();
    try {
      const data = await updateUser(user.id, obs, permission);
      toastMsg(ToastType.Success, data.message);
      fetchUsers();
    } catch (error) {
      toastMsg(ToastType.Error, (error as Error).message);
    }
  };
  const permissions = [
    {
      value: 'false',
      label: 'Colaborador',
    },
    {
      value: 'true',
      label: 'Administrador',
    },
  ];

  const [form, setForm] = useState({
    obs: user.obs,
    permission: `${user.permission}`,
  });

  return (
    <>
      <Button variant="outlined" onClick={handleOpen} endIcon={<EditIcon />}>
        Editar
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={style.modalStyle}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Editar usuário
          </Typography>
          <form onSubmit={(event) => updateUserHandler(event, form)}>
            <TextField
              className={style.marginTop}
              disabled
              id="name"
              label="Nome"
              value={user.name}
              variant="outlined"
            />
            <TextField className={style.marginTop} disabled value={user.cpf} id="cpf" label="CPF" variant="outlined" />
            <TextField
              className={style.marginTop}
              disabled
              value={formatDateBR(user.birthDate)}
              id="birthDate"
              label="Data de nascimento"
              variant="outlined"
            />
            <TextField
              className={style.marginTop}
              inputProps={{
                maxLength: 500,
              }}
              value={form.obs}
              onChange={(e) => setForm({ ...form, obs: e.target.value })}
              id="obs"
              label="Observação"
              multiline
              maxRows={6}
            />
            <TextField
              className={style.marginTop}
              id="permission"
              select
              label="Permissão"
              value={form.permission}
              onChange={(e) => setForm({ ...form, permission: e.target.value })}
            >
              {permissions.map((option) => (
                <MenuItem key={option.label} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <button type="submit" className={style.marginTop}>
              Editar
            </button>
          </form>
        </Box>
      </Modal>
    </>
  );
}
