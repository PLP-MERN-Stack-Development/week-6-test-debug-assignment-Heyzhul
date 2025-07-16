import { useState } from 'react';

export default function CreatePost() {
  const [form, setForm] = useState({ title: '', content: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create post');
      setMessage('Post created!');
      setForm({ title: '', content: '' });
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Create Post</h2>
      {message && <p className="mb-2 text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} className="w-full p-2 border rounded" />
        <textarea name="content" placeholder="Content" value={form.content} onChange={handleChange} className="w-full p-2 border rounded h-40" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Post</button>
      </form>
    </div>
  );
}
import { useState } from 'react';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) formData.append('image', image);

    const res = await fetch('http://localhost:5000/api/posts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();
    console.log('Created post:', data);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4 mt-10">
      <input
        type="text"
        placeholder="Post Title"
        className="w-full border p-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Post Content"
        className="w-full border p-2"
        rows="5"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Create Post
      </button>
    </form>
  );
}
