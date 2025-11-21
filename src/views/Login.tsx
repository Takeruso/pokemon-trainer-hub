import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import FormInput from '../components/FormInput';
import FormAlert from '../components/FormAlert';
import FormWrapper from '../components/FormWrapper';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});
  const { login } = useAuth();

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

    const ok = await login(username, password);
    if (ok) {
      setSuccess('Login successful');
      setError('');
    } else {
      setError('Invalid username or password');
      setSuccess('');
    }
  }

  return (
    <div className="container">
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
            <button type="submit">Submit</button>
          </div>
        </FormWrapper>

        <div className="col-12 mb-3">
          <FormAlert
            message={success || error}
            variant={success ? 'success' : 'danger'}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
