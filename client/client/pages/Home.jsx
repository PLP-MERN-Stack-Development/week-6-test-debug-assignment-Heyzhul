import { useEffect, useState } from 'react';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/posts')
      .then(res => res.json())
      .then(setPosts)
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-6">
      <h1 className="text-3xl font-bold">Latest Posts</h1>
      {posts.map(post => (
        <div key={post._id} className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="text-gray-700">{post.content}</p>
          <p className="text-sm text-gray-500 mt-2">By: {post.author.username}</p>
        </div>
      ))}
    </div>
  );
}
