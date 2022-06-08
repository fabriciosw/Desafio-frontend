import React, { useState } from 'react';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import { loginUser } from '../../services/session.service';

export default function Login(): JSX.Element {
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
          <input
            value={form.cpf}
            onChange={(evento) => setForm({ ...form, cpf: evento.target.value })}
            type="number"
            name="cpf"
            id="cpf"
            placeholder="CPF"
            required
          />
        </label>
        <label htmlFor="password">
          Digite sua senha
          <input
            value={form.password}
            onChange={(evento) => setForm({ ...form, password: evento.target.value })}
            type="password"
            name="password"
            id="password"
            placeholder="password"
            required
          />
        </label>
        <input type="submit" data-testid="logar" />
      </div>
    </form>
  );
}
