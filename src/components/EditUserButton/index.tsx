import React, { Dispatch, SetStateAction, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import { getUsers, updateUser } from '../../services/users.service';
import IUser from '../../interfaces/IUser';
import formatDateBR from '../../utils/formatDateBR';
import toastMsg, { ToastType } from '../../utils/toastMsg';

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
    } catch (error) {
      toastMsg(ToastType.Error, (error as Error).message);
    }
  };
  const updateUserHandler = async (event: React.FormEvent, { obs, permission }: UpdateUser): Promise<void> => {
    event.preventDefault();
    try {
      const data = await updateUser(user.id, obs, permission);
      toastMsg(ToastType.Success, data);
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

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Button variant="outlined" onClick={handleOpen}>
        Editar usuário
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Editar usuário
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          <form onSubmit={(event) => updateUserHandler(event, form)}>
            <TextField disabled id="name" label="Nome" value={user.name} variant="outlined" />
            <TextField disabled value={user.cpf} id="cpf" label="CPF" variant="outlined" />
            <TextField
              disabled
              value={formatDateBR(user.birthDate)}
              id="birthDate"
              label="Data de nascimento"
              variant="outlined"
            />
            <TextField
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
              id="permission"
              select
              label="Permissão"
              value={form.permission}
              onChange={(e) => setForm({ ...form, permission: e.target.value })}
              helperText="Selecione a permissão"
            >
              {permissions.map((option) => (
                <MenuItem key={option.label} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <input type="submit" />
          </form>
        </Box>
      </Modal>
    </>
  );
}
