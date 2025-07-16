import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`http://localhost:5000/api/posts/${postId}`)
      .then(res => res.json())
      .then(setPost);
  }, [postId]);

  const submitComment = async () => {
    const res = await fetch(`http://localhost:5000/api/posts/${postId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text: comment }),
    });
    const updated = await res.json();
    setPost(updated);
    setComment('');
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p>{post.content}</p>
      <hr />
      <h2 className="text-xl font-semibold mt-4">Comments</h2>
      {post.comments.map((c, i) => (
        <p key={i} className="text-sm border-b py-1">{c.text}</p>
      ))}
      <textarea
        className="w-full p-2 border mt-4"
        rows="3"
        placeholder="Add a comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <button onClick={submitComment} className="bg-blue-600 text-white px-4 py-2 mt-2 rounded">
        Submit Comment
      </button>
    </div>
  );
}
{post.image && (
  <img
    src={`http://localhost:5000${post.image}`}
    alt="Post"
    className="my-4 rounded-md shadow-md max-h-96 object-cover w-full"
  />
)}
