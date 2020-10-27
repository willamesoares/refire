import React, { useState, useEffect, useRef } from 'react';

import { auth } from '../services/firebase';
import { db } from '../services/firebase';

import Button from '../components/Button';
import Form from '../components/Form';

import '../styles/Chat.css';

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [content, setContent] = useState('');
  const [readError, setReadError] = useState(null);
  const [writeError, setWriteError] = useState(null);
  const chatContentRef = useRef(null);

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
        scrollToLatestMessage();
      });
    } catch (error) {
      setReadError(error.message);
    }
  }, []);

  const scrollToLatestMessage = () => {
    const {
      current: {
        scrollTop,
        scrollHeight
      } = {}
    } = chatContentRef || {};

    if (!chatContentRef || !chatContentRef.current || (scrollTop === scrollHeight)) {
      return;
    }

    chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
  }

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
      scrollToLatestMessage();
    } catch (error) {
      setWriteError(error.message);
    }
  };

  return (
    <div className='Chat'>
      <div className='Chat-content' ref={chatContentRef}>
        { chats.map(chat => {
          return (
            <div
              className={`Chat-message Chat-message--${user.uid === chat.uid ? 'mine' : 'theirs'}`}
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
      <Form
        onSubmitHandler={ handleSubmit }
        error={ readError || writeError }
      >
        <textarea
          onChange={ event => setContent(event.target.value) }
          value={ content }
        />
        <Button type='submit' text='Send' />
      </Form>
    </div>
  );
};

export default Chat;
