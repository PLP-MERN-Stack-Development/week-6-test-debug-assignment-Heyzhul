import { useEffect, useState } from 'react';

export default function Profile() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:5000/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setUser);
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold">User Profile</h1>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>ID:</strong> {user._id}</p>
    </div>
  );
}
