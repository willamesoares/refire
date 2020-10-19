import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '../components/Button';
import Form from '../components/Form';
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
      <h1>Refire Chat</h1>
      <Form
        onSubmitHandler={ handleSubmit }
        error={ error }
        inputs={[
          <input
            placeholder='Email'
            name='email'
            type='email'
            onChange={ event => setEmail(event.target.value) }
            value={ email }
          />,
          <input
            placeholder='Password'
            name='password'
            onChange={ event => setPassword(event.target.value) }
            value={ password }
            type='password'
          />
        ]}
        buttons={[
          <Button
            text='Log In'
            type='submit'
            disabled={ !(email && password) }
          />,
          <Button
            onClick={ googleSignIn }
            type="button"
          >
            Sign in with <img src='./google.png' alt='google' />
          </Button>
        ]}
      />
      <p>Don't have an account? <Link to='/signup'>Signup</Link></p>
    </div>
  );
};

export default Login;
