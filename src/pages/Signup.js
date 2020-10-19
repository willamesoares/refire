import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '../components/Button';
import Form from '../components/Form';
import { signup, signInWithGoogle } from '../helpers/auth';

import '../styles/Signup.css';

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
      <h1>Refire Chat</h1>
      <Form
        onSubmitHandler={ handleSubmit }
        error={ error }
        inputs={[
          <input
            className='Form-input'
            placeholder='First Name'
            name='firstName'
            type='text'
            onChange={ event => setFirstName(event.target.value) }
            value={ firstName }
          />,
          <input
            className='Form-input'
            placeholder='Last Name'
            name='lastName'
            type='text'
            onChange={ event => setLastName(event.target.value) }
            value={ lastName }
          />,
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
            text='Sign Up'
            type='submit'
            disabled={ !(firstName && lastName && email && password) }
          />,
          <Button
            onClick={ googleSignIn }
            type="button"
          >
            Sign up with <img src='./google.png' alt='google' />
          </Button>
        ]}
      />
      <p>Already have an account? <Link to='/login'>Login</Link></p>
  </div>
  );
}

export default Signup;
