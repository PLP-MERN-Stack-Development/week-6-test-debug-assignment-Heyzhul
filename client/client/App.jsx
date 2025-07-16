import React from 'react';
import ChatRoom from './components/ChatRoom';
import { SocketProvider } from './context/SocketContext';

function App() {
  const room = 'general';
  const user = 'Heyzhul'; // Replace with auth

  return (
    <SocketProvider>
      <h1 className="text-2xl font-bold text-center my-4">🔌 Socket.io Chat</h1>
      <ChatRoom room={room} user={user} />
    </SocketProvider>
  );
}

export default App;
