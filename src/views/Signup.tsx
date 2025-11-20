import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const { register } = useAuth();

  const validate = () => {
    const newErrors: { username?: string; password?: string } = {};
    if (!username) newErrors.username = 'username is required.';
    if (!password) {
      newErrors.password = 'password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'password must be at least 6 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    try {
      await register(username, password);
      setError('Signup successful. You can now log in.');
      setIsSuccess(true);
    } catch {
      setError('User already exists');
      setIsSuccess(false);
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mt-3">
          <h2>Sign Up</h2>
        </div>
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <input
              name="username"
              className="form-input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && (
              <div className="mt-1 text-danger small">{errors.username}</div>
            )}
          </div>

          <div className="mb-3">
            <input
              name="password"
              type="password"
              className="form-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <div className="mt-1 text-danger small">{errors.password}</div>
            )}
          </div>
          
          <div className="mb-3">
            <button type="submit">Submit</button>
          </div>
        </form>
        
        <div className="col-12">
          {error && (
            <div className={isSuccess ? 'alert alert-success' : 'alert alert-danger'}>
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signup;
