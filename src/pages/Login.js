import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { signin, signInWithGoogle } from '../helpers/auth';

import '../styles/Login.css';
import '../styles/Form.css';

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
      <form className='Form' onSubmit={ handleSubmit }>
        <h1>
          Login to <Link to='/'>Refire Chat</Link>
        </h1>
        <div className='Form-inputs'>
          <input
            className='Form-input'
            placeholder='Email'
            name='email'
            type='email'
            onChange={ event => setEmail(event.target.value) }
            value={ email }
          />
          <input
            className='Form-input'
            placeholder='Password'
            name='password'
            onChange={ event => setPassword(event.target.value) }
            value={ password }
            type='password'
          />
        </div>
        <div className='Form-buttons'>
          <button
            className='Form-button'
            type='submit'
            disabled={ !(email && password) }
          >
            Login
          </button>
          <button
            className='Form-button'
            onClick={ googleSignIn }
            type="button"
          >
            Sign in with <img src='./google.png' alt='google' />
          </button>
        </div>
        { error ? <p className='Form-error'>{ error }</p> : null }
        <p>Don't have an account? <Link to='/signup'>Signup</Link></p>
      </form>
    </div>
  );
};

export default Login;
