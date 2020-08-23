import React, { useState, useEffect } from 'react';

import { auth } from '../services/firebase';
import { db } from '../services/firebase';

const Chat = () => {
  const [user, setUser] = useState(auth().currentUser);
  const [chats, setChats] = useState([]);
  const [content, setContent] = useState('');
  const [readError, setReadError] = useState(null);
  const [writeError, setWriteError] = useState(null);

  useEffect(() => {
    setReadError(null);
    try {
      db.ref('chats').on('value', snapshot => {
        let newChats = [];
        snapshot.forEach((snap) => {
          newChats.push(snap.val());
        });
        setChats(newChats);
      });
    } catch (error) {
      setReadError(error.message);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setWriteError(null);
    try {
      await db.ref('chats').push({
        content,
        timestamp: Date.now(),
        uid: user.uid
      });
      setContent('');
    } catch (error) {
      setWriteError(error.message);
    }
  };

  return (
    <div>
      <div>
        { chats.map(chat => {
          return <p key={chat.timestamp}>{chat.content}</p>
        }) }
      </div>
      <form onSubmit={ handleSubmit }>
        <input
          onChange={ event => setContent(event.target.value) }
          value={ content }
        />
        { writeError ? <p>{ writeError }</p> : null }
        <button type='submit'>Send</button>
      </form>
      <div>
        Loged in as: <strong>{ user.email }</strong>
      </div>
    </div>
  );
};

export default Chat;
