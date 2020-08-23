import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { signup, signInWithGoogle } from '../helpers/auth';

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
    <div>
      <form onSubmit={ handleSubmit }>
        <h1>
          Sign Up to
        <Link to='/'>Refire</Link>
        </h1>
        <p>Fill in the form below to create an account.</p>
        <div>
          <input
            placeholder='First Name'
            name='firstName'
            type='text'
            onChange={ event => setFirstName(event.target.value) }
            value={ firstName }
          />
        </div>
        <div>
          <input
            placeholder='Last Name'
            name='lastName'
            type='text'
            onChange={ event => setLastName(event.target.value) }
            value={ lastName }
          />
        </div>
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
          { error ? <p>{ error }</p> : null }
          <button
            type='submit'
            disabled={ !(firstName && lastName && email && password) }
          >
            Sign up
          </button>
          <p>Or</p>
          <button onClick={ googleSignIn } type="button">
            Sign up with Google
          </button>
        </div>
        <p>Already have an account? <Link to='/login'>Login</Link></p>
      </form>
    </div>
  );
}

export default Signup;
