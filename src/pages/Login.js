import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { signin, signInWithGoogle } from '../helpers/auth';

import '../styles/Login.css';

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
    <div className='Login'>
      <form
        autoComplete='off'
        onSubmit={ handleSubmit }
      >
        <h1>
          Login to
          <Link to='/'>
            Refire Chat
          </Link>
        </h1>
        <div className='Login-inputs'>
          <input
            className='Login-input'
            placeholder='Email'
            name='email'
            type='email'
            onChange={ event => setEmail(event.target.value) }
            value={ email }
          />
          <input
            className='Login-input'
            placeholder='Password'
            name='password'
            onChange={ event => setPassword(event.target.value) }
            value={ password }
            type='password'
          />
        </div>
        <div className='Login-buttons'>
          { error ? (
            <p>{ error }</p>
          ) : null }
          <button
            className='Login-button'
            type='submit'
          >
            Login
          </button>
          <button
            className='Login-button'
            onClick={ googleSignIn }
            type="button"
          >
            Sign in with <img src='./google.png' alt='google' />
          </button>
        </div>
        <p>Don't have an account? <Link to='/signup'>Signup</Link></p>
      </form>
    </div>
  );
};

export default Login;
