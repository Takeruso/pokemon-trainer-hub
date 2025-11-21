import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import FormInput from '../components/FormInput';
import FormAlert from '../components/FormAlert';
import FormWrapper from '../components/FormWrapper';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});
  const { register } = useAuthContext();

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
      <div className="row justify-content-center">
        <div className="col-12 mt-3 text-center">
          <h2>Sign Up</h2>
        </div>

        <FormWrapper onSubmit={handleSignup}>
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

        <div className="col-12">
          <FormAlert
            message={error}
            variant={isSuccess ? 'success' : 'danger'}
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;
