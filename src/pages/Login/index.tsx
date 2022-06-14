import { TextField, TextFieldProps } from '@mui/material';
import React, { useState } from 'react';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import { loginUser } from '../../services/session.service';
import './styles.scss';
import Text from '../../components/Text'

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
    <div className="loginpage">
      <section className="leftside">
        <div className="text">
          <Text as="h1" weight={700}>Portal do colaborador</Text>
          <Text as="p" weight={300}>Desafio Trainee Softdesign</Text>
        </div>
      </section>
      <section className="rightside">
        <div className="login-card">
          <Text as="h3" weight={700}>Olá colaborador,</Text>
          <Text as="h5">faça o seu login</Text>
          <form onSubmit={(event) => loginUserHandler(event, form)}>
            <div className="login-inputs">
              <InputMask
                mask="999.999.999-99"
                onChange={(evento: React.ChangeEvent<HTMLInputElement>) =>
                  setForm({ ...form, cpf: evento.target.value })
                }
                value={form.cpf}
              >
                {(inputProps: JSX.IntrinsicAttributes & TextFieldProps) => (
                  <TextField {...inputProps} variant="outlined" id="cpf" label="CPF" required />
                )}
              </InputMask>
              <TextField
                variant="outlined"
                value={form.password}
                onChange={(evento) => setForm({ ...form, password: evento.target.value })}
                type="password"
                name="password"
                id="password"
                label="Senha"
                required
              />
              <input className="submit" type="submit" data-testid="logar" value="Entrar" />
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
