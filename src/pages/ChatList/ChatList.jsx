// ChatList.jsx

import './ChatList.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { Link } from 'react-router-dom';

function ChatList() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get('http://localhost:8080/chats', {
          params: { userId }
        });
        console.log(response.data);  // Log the entire response data
        setChats(response.data); // Make sure chatList is an array
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
  }, []);

return (
  <div className="chat-list">
    {chats && chats.length > 0 ? (
      chats.map(chat => (
        <div key={chat._id} className="chat-preview">
          <div className="username">{chat.sender.username}</div>
          {/* Use a div for the message to apply padding and background */}
          <div className="message">{chat.message}</div> 
          <div className="timestamp">
            {chat.createdAt && !isNaN(new Date(chat.createdAt).getTime()) 
              ? new Date(chat.createdAt).toLocaleString() 
              : ''}
          </div>
        </div>
      ))
    ) : (
      <div>No chats available or loading...</div>
    )}
  </div>
);


}

export default ChatList;

