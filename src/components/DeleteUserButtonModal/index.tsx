import React, { Dispatch, SetStateAction, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import IUser from '../../interfaces/IUser';
import { getUsers, deleteUser } from '../../services/users.service';
import toastMsg, { ToastType } from '../../utils/toastMsg';

interface Props {
  id: number;
  setUsers: Dispatch<SetStateAction<IUser[]>>;
}
export default function DeleteUserButton({ id, setUsers }: Props): JSX.Element {
  const [open, setOpen] = useState(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  const fetchUsers = async (): Promise<void> => {
    try {
      const data = await getUsers();
      setUsers(data);
      handleClose();
    } catch (error) {
      toastMsg(ToastType.Error, (error as Error).message);
    }
  };
  const deleteUserHandler = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    try {
      const data = await deleteUser(id);
      toastMsg(ToastType.Success, data);
      fetchUsers();
    } catch (error) {
      toastMsg(ToastType.Error, (error as Error).message);
    }
  };

  return (
    <>
      <Button variant="outlined" onClick={handleOpen} color="error" endIcon={<DeleteIcon />}>
        Deletar
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-style">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Deseja mesmo deletar esse usuário?
          </Typography>
          <Button variant="contained" onClick={(e) => deleteUserHandler(e)} color="error" sx={{ mt: 2 }}>
            Deletar usuário
          </Button>
        </Box>
      </Modal>
    </>
  );
}
