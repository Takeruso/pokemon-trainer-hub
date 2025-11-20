import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
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
        <form onSubmit={handleLogin}>
          <div className="col-12 mb-3">
            <input
              name="username"
              className="form-input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && (
              <div className="text-danger small mt-1">{errors.username}</div>
            )}
          </div>

          <div className="col-12 mb-3">
            <input
              name="password"
              type="password"
              className="form-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <div className="text-danger small mt-1">{errors.password}</div>
            )}
          </div>

          <div className="col-12 mb-3">
            {success && <div className="alert alert-success">{success}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
          </div>
          
          <div className="col-12 mb-3">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
