import React from 'react';

import { auth } from '../services/firebase';

import '../styles/Header.css';

const Header = () => {
  const user = auth().currentUser;

  return (
    <div className='Header'>
      <p>
        Logged in as: <strong>{ user.displayName }</strong>
      </p>
      <button
        type='submit'
        onClick={ () => auth().signOut() }
      >
        Sign Out
      </button>
    </div>
  )
};

export default Header;
