import React, { useState, useEffect } from 'react';

import { auth } from '../services/firebase';
import { db } from '../services/firebase';

import '../styles/Chat.css';

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [content, setContent] = useState('');
  const [readError, setReadError] = useState(null);
  const [writeError, setWriteError] = useState(null);

  const user = auth().currentUser;
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
    if (!content) {
      return;
    }

    setWriteError(null);
    try {
      await db.ref('chats').push({
        content,
        timestamp: Date.now(),
        uid: user.uid,
        userDisplayName: user.displayName
      });
      setContent('');
      window.scrollTo(0, document.body.scrollHeight);
    } catch (error) {
      setWriteError(error.message);
    }
  };

  return (
    <div className='Chat'>
      <div className='Chat-content'>
        { chats.map(chat => {
          return (
            <div
              className='Chat-message'
              style={{
                ...(user.uid === chat.uid ? {
                  alignSelf: 'flex-end',
                  backgroundColor: '#79afe6'
                } : {
                  alignSelf: 'flex-start',
                  backgroundColor: '#babfc5'
                })
              }}
            >
              { user.uid !== chat.uid ? (
                <small><strong>{ chat.userDisplayName }</strong></small>
              ) : null }
              <p key={ chat.timestamp }>
                { chat.content }
              </p>
            </div>
          )
        }) }
      </div>
      <form className='Chat-form' onSubmit={ handleSubmit }>
        <input
          className='Chat-input'
          onChange={ event => setContent(event.target.value) }
          value={ content }
        />
        { readError ? <p>{ readError }</p> : null }
        { writeError ? <p>{ writeError }</p> : null }
        <button className='Chat-button' type='submit'>Send</button>
      </form>
    </div>
  );
};

export default Chat;
