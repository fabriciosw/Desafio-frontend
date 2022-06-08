import { TextField, TextFieldProps } from '@mui/material';
import React, { useState } from 'react';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import { loginUser } from '../../services/session.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const InputMask = require('react-input-mask');

export default function Login(): React.ReactElement {
  const [form, setForm] = useState({ cpf: '', password: '' });
  const { setIsAuthenticated, setIsAdmin } = AuthenticationContext();

  interface loginUser {
    cpf: string;
    password: string;
  }

  const loginUserHandler = async (event: React.FormEvent, { cpf, password }: loginUser): Promise<void> => {
    event.preventDefault();
    await loginUser(cpf, password, setIsAuthenticated, setIsAdmin);
  };

  return (
    <form onSubmit={(event) => loginUserHandler(event, form)}>
      <div className="campos">
        <label htmlFor="cpf">
          Digite seu CPF
          <InputMask
            mask="999.999.999-99"
            onChange={(evento: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, cpf: evento.target.value })}
            value={form.cpf}
          >
            {(inputProps: JSX.IntrinsicAttributes & TextFieldProps) => (
              <TextField {...inputProps} variant="filled" id="cpf" label="CPF" required />
            )}
          </InputMask>
        </label>
        Digite sua senha
        <TextField
          variant="filled"
          value={form.password}
          onChange={(evento) => setForm({ ...form, password: evento.target.value })}
          type="password"
          name="password"
          id="password"
          label="Senha"
          required
        />
        <input type="submit" data-testid="logar" />
      </div>
    </form>
  );
}
