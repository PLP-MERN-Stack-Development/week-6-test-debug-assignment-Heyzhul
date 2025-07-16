const API_URL = 'http://localhost:5000/api';

export async function registerUser(userData) {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!res.ok) throw new Error('Failed to register');
  return res.json();
}

export async function loginUser(userData) {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!res.ok) throw new Error('Invalid credentials');
  return res.json();
}
