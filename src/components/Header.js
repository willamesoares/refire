import React from 'react';

import { auth } from '../services/firebase';

import Button from '../components/Button';

import '../styles/Header.css';

const Header = () => {
  const user = auth().currentUser;

  return (
    <div className='Header'>
      <p>
        Logged in as: <strong>{ user.displayName }</strong>
      </p>
      <Button
        type='submit'
        onClick={ () => auth().signOut() }
        text='Sign Out'
      />
    </div>
  );
};

export default Header;
