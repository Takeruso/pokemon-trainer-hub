// src/views/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import FormInput from '../components/FormInput';
import FormAlert from '../components/FormAlert';
import FormWrapper from '../components/FormWrapper';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<
    | 'idle'
    | 'submitting'
    | 'success'
    | 'invalid'
    | 'server-error'
    | 'network-error'
  >('idle');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});

  const { login } = useAuthContext();

  const navigate = useNavigate();

  const validate = () => {
    const newErrors: { username?: string; password?: string } = {};
    if (!username) newErrors.username = 'username is required.';
    if (!password) newErrors.password = 'password is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    setMessage('');

    const result = await login(username, password);

    if (result.ok) {
      setStatus('success');
      setMessage('Login successful');
      navigate('/dashboard');
      return;
    }

    switch (result.reason) {
      case 'invalid-credentials':
        setStatus('invalid');
        setMessage(result.message);
        break;
      case 'server-error':
        setStatus('server-error');
        setMessage(result.message);
        break;
      case 'network-error':
        setStatus('network-error');
        setMessage(result.message);
        break;
    }
  }

  const alertVariant =
    status === 'success'
      ? 'success'
      : status === 'invalid'
        ? 'warning'
        : status === 'server-error' || status === 'network-error'
          ? 'danger'
          : 'danger';

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-12 mt-3">
          <h2>Login</h2>
        </div>

        <FormWrapper onSubmit={handleLogin}>
          <FormInput
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={errors.username}
          />

          <FormInput
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />

          <div className="mb-3">
            <button type="submit" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </FormWrapper>

        <div className="col-12 mb-3">
          {message && (
            <FormAlert message={message} variant={alertVariant as any} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
