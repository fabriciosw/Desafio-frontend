import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IUser from '../../interfaces/IUser';
import { deleteUser } from '../../services/users.service';

interface Props {
  setUsers: (x: IUser[]) => void;
  id: number;
}
export default function DeleteUserButton({ setUsers, id }: Props): JSX.Element {
  const [open, setOpen] = useState(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

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
      <Button variant="outlined" onClick={handleOpen} color="error">
        Deletar usuário
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Deletar usuário
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Deseja mesmo deletar esse usuário?
          </Typography>
          <Button variant="contained" onClick={(e) => deleteUser(e, id, setUsers)} color="error">
            Deletar usuário
          </Button>
        </Box>
      </Modal>
    </>
  );
}
