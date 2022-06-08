import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import { createUser } from '../../services/users.service';
import IUser from '../../interfaces/IUser';

interface Props {
  setUsers: (x: IUser[]) => void;
}
export default function CreateUserButton({ setUsers }: Props): JSX.Element {
  const [open, setOpen] = useState(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

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
    cpf: '',
    name: '',
    birthDate: '',
    password: '',
    obs: '',
    permission: 'false',
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
      <Button variant="contained" onClick={handleOpen}>
        Criar usuário
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Novo usuário
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          <form
            onSubmit={(event) =>
              createUser(event, form.name, form.cpf, form.birthDate, form.password, form.obs, form.permission, setUsers)
            }
          >
            <TextField
              inputProps={{
                maxLength: 120,
              }}
              required
              id="name"
              label="Nome"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              defaultValue=""
              variant="outlined"
            />
            <TextField
              required
              value={form.cpf}
              onChange={(e) => setForm({ ...form, cpf: e.target.value })}
              id="cpf"
              label="CPF"
              type="number"
              defaultValue=""
              variant="outlined"
            />
            <TextField
              required
              value={form.birthDate}
              onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
              id="birthDate"
              label="Data de nascimento"
              defaultValue=""
              variant="outlined"
            />
            <TextField
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              id="password"
              label="Senha"
              type="password"
              defaultValue=""
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
