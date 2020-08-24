import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { signup, signInWithGoogle } from '../helpers/auth';

import '../styles/Singup.css';
import '../styles/Form.css';

const Signup = () => {
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      await signup(email, password, firstName, lastName);
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
    <div className='Signup'>
      <form className='Form' onSubmit={ handleSubmit }>
        <h1>
          Sign up to <Link to='/'>Refire Chat</Link>
        </h1>
        <div className='Form-inputs'>
          <input
            className='Form-input'
            placeholder='First Name'
            name='firstName'
            type='text'
            onChange={ event => setFirstName(event.target.value) }
            value={ firstName }
          />
          <input
            className='Form-input'
            placeholder='Last Name'
            name='lastName'
            type='text'
            onChange={ event => setLastName(event.target.value) }
            value={ lastName }
          />
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
            disabled={ !(firstName && lastName && email && password) }
          >
            Sign up
          </button>
          <button
            className='Form-button'
            onClick={ googleSignIn }
            type="button"
          >
            Sign up with <img src='./google.png' alt='google' />
          </button>
        </div>
        { error ? <p className='Form-error'>{ error }</p> : null }
        <p>Already have an account? <Link to='/login'>Login</Link></p>
      </form>
    </div>
  );
}

export default Signup;
