import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/Home.css';

const Home = () => {
  return (
    <div className='Home'>
      <h1>Welcome to Refire Chat</h1>
      <div className='Home-buttons'>
        <Link to='/login'><button>Log In</button></Link>
        <Link to='/signup'><button>Sign Up</button></Link>
      </div>
    </div>
  )
}

export default Home;
