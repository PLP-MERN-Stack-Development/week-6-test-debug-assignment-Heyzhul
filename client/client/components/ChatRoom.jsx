import React, { useEffect, useState } from 'react';
import { useSocket } from '../context/SocketContext';

const ChatRoom = ({ room, user }) => {
  const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typingUser, setTypingUser] = useState(null);

  useEffect(() => {
    socket.emit('join', room);

    socket.on('receiveMessage', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    socket.on('userTyping', (u) => {
      setTypingUser(u);
      setTimeout(() => setTypingUser(null), 2000);
    });

    return () => {
      socket.off('receiveMessage');
      socket.off('userTyping');
    };
  }, [room, socket]);

  const sendMessage = () => {
    const message = { room, sender: user, text: input };
    socket.emit('sendMessage', message);
    setInput('');
  };

  const handleTyping = () => {
    socket.emit('typing', { room, user });
  };

  return (
    <div className="p-4">
      <div className="h-64 overflow-y-scroll border">
        {messages.map((msg, i) => (
          <div key={i}>
            <b>{msg.sender}:</b> {msg.text}
          </div>
        ))}
        {typingUser && <p><i>{typingUser} is typing...</i></p>}
      </div>

      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleTyping}
        placeholder="Type message..."
        className="border p-2 w-full mt-2"
      />
      <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 mt-2">Send</button>
    </div>
  );
};

export default ChatRoom;
