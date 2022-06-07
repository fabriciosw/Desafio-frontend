import React, { useState } from 'react';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import { loginUser } from '../../services/session.service';

export default function Login(): JSX.Element {
  const [CPF, setCPF] = useState('');
  const [password, setPassword] = useState('');

  const { setIsAuthenticated } = AuthenticationContext();

  return (
    <form onSubmit={(event) => loginUser(event, CPF, password, setIsAuthenticated)}>
      <div className="campos">
        <label htmlFor="cpf">
          Digite seu CPF
          <input
            value={CPF}
            onChange={(evento) => setCPF(evento.target.value)}
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
            value={password}
            onChange={(evento) => setPassword(evento.target.value)}
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
