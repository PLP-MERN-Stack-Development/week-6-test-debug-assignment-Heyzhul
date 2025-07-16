import { useSocket } from '../context/SocketContext';

const Sidebar = () => {
  const { onlineUsers } = useSocket();

  return (
    <div>
      <h2 className="text-xl font-bold">Online Users</h2>
      <ul>
        {onlineUsers.map((userId) => (
          <li key={userId}>{userId}</li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
