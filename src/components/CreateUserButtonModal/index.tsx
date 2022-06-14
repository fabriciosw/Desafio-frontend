import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { Dispatch, SetStateAction, useState } from 'react';
import IUser from '../../interfaces/IUser';
import { createUser, getUsers } from '../../services/users.service';
import toastMsg, { ToastType } from '../../utils/toastMsg';
import './styles.scss';

// Necessary to be imported with require
// eslint-disable-next-line @typescript-eslint/no-var-requires
const InputMask = require('react-input-mask');

interface Props {
  setUsers: Dispatch<SetStateAction<IUser[]>>;
}
export default function CreateUserButton({ setUsers }: Props): JSX.Element {
  const [open, setOpen] = useState(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  const fetchUsers = async (): Promise<void> => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      toastMsg(ToastType.Error, (error as Error).message);
    }
  };

  const cleanForm = {
    cpf: '',
    name: '',
    birthDate: '',
    password: '',
    obs: '',
    permission: 'false',
  };

  const [form, setForm] = useState(cleanForm);

  interface CreateUser {
    name: string;
    birthDate: string;
    obs: string;
    cpf: string;
    permission: string;
    password: string;
  }

  const createUserHandler = async (
    event: React.FormEvent,
    { name, cpf, birthDate, password, obs, permission }: CreateUser
  ): Promise<void> => {
    event.preventDefault();
    try {
      const data = await createUser(name, cpf, birthDate, password, obs, permission);

      setForm(cleanForm);
      if (data === 'User created') {
        toastMsg(ToastType.Success, data);
        handleClose();
        fetchUsers();
      } else toastMsg(ToastType.Error, data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toastMsg(ToastType.Error, error.response.data.message);
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
  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Criar usuário
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-style">
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Novo usuário
          </Typography>
          <form onSubmit={(event) => createUserHandler(event, form)}>
            <TextField
              className="margin-top"
              inputProps={{
                maxLength: 120,
              }}
              required
              id="name"
              label="Nome"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              variant="outlined"
            />
            <InputMask
              className="margin-top"
              mask="999.999.999-99"
              onChange={(evento: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, cpf: evento.target.value })}
              value={form.cpf}
            >
              {(inputProps: JSX.IntrinsicAttributes & TextFieldProps) => (
                <TextField {...inputProps} variant="outlined" id="cpf" label="CPF" required />
              )}
            </InputMask>
            <InputMask
              className="margin-top"
              mask="99/99/9999"
              onChange={(evento: React.ChangeEvent<HTMLInputElement>) =>
                setForm({ ...form, birthDate: evento.target.value })
              }
              value={form.birthDate}
            >
              {(inputProps: JSX.IntrinsicAttributes & TextFieldProps) => (
                <TextField {...inputProps} variant="outlined" id="birthDate" label="Data de nascimento" required />
              )}
            </InputMask>
            <TextField
              className="margin-top"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              id="password"
              label="Senha"
              type="password"
              variant="outlined"
            />
            <TextField
              className="margin-top"
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
              className="margin-top"
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
            <button className="margin-top" type="submit">
              Criar
            </button>
          </form>
        </Box>
      </Modal>
    </>
  );
}
