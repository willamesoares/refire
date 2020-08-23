import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { signin, signInWithGoogle } from '../helpers/auth';

const Login = () => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      await signin(email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  const googleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <form
        autoComplete='off'
        onSubmit={ handleSubmit }
      >
        <h1>
          Login to
          <Link to='/'>
            Refire
          </Link>
        </h1>
        <p>
          Fill in the form below to login to your account.
        </p>
        <div>
          <input
            placeholder='Email'
            name='email'
            type='email'
            onChange={ event => setEmail(event.target.value) }
            value={ email }
          />
        </div>
        <div>
          <input
            placeholder='Password'
            name='password'
            onChange={ event => setPassword(event.target.value) }
            value={ password }
            type='password'
          />
        </div>
        <div>
          { error ? (
            <p>{ error }</p>
          ) : null }
          <button type='submit'>Login</button>
          <p>Or</p>
          <button onClick={ googleSignIn } type="button">
            Sign in with Google
          </button>
        </div>
        <p>Don't have an account? <Link to='/signup'>Signup</Link></p>
      </form>
    </div>
  );
};

export default Login;
