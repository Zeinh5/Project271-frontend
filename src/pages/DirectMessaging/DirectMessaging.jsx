import Messages from '../../components/Messages/Messages';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ChatHistory({ match }) {
  const [messages, setMessages] = useState([]);
  const { userId } = match.params; // Assuming you're using react-router and the route is '/chat/:userId'

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8080/messages/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [userId]);

  return (
    <div className="chat-history">
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.sender._id === userId ? 'sent' : 'received'}`}>
          <p>{msg.message}</p>
          <small>{new Date(msg.timestamp).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}

export default ChatHistory;
