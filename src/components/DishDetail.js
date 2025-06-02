import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import CommentForm from './CommentForm';

function DishDetail({ dishes, user, onAddReview }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const dish = dishes.find(d => d.id === parseInt(id));
  const [comments, setComments] = useState(dish ? dish.comments : []);

  const addComment = (comment, rating) => {
    const newComment = {
      id: Date.now(),
      user: user.name,
      text: comment,
      rating,
      timestamp: new Date().toLocaleString('vi-VN'),
      dishName: dish.name,
    };
    setComments([...comments, newComment]);
    onAddReview(newComment);
  };

  if (!dish) {
    return <div className="max-w-5xl mx-auto p-5">Món ăn không tồn tại</div>;
  }

  return (
    <main className="max-w-5xl mx-auto p-5">
      <span
        onClick={() => navigate(-1)}
        className="text-primary hover:underline mb-5 inline-block"
      >
        ← Quay lại
      </span>

      <div className="card">
        <div className="image-container-no-overlay">
          <img src={dish.image} alt={dish.name} className="w-full h-[300px] object-cover" />
        </div>
        <div className="p-4">
          <h2 className="text-2xl font-bold">{dish.name}</h2>
          <p className="text-lg">
            <Link to={`/restaurant/${dish.id}`} className="text-blue-600 hover:underline">
              {dish.restaurant}
            </Link> · {dish.rating}⭐ · {dish.distance}m
          </p>
          <p className="text-primary italic">{dish.slogan}</p>
          <p className="mt-2">{dish.description || 'Món ăn thơm ngon, phù hợp cho sinh viên!'}</p>
        </div>
      </div>

      <section className="mt-10">
        <h3 className="text-xl font-bold mb-5">💬 Bình luận và đánh giá</h3>
        {user ? (
          <CommentForm addComment={addComment} />
        ) : (
          <p className="text-red-500">
            Vui lòng <Link to="/login" className="text-primary underline">đăng nhập</Link> để bình luận.
          </p>
        )}
        <div className="mt-5 space-y-4">
          {comments.map(comment => (
            <div key={comment.id} className="bg-white p-4 rounded-lg shadow-lg">
              <p><strong>{comment.user}</strong> ({comment.rating}⭐): {comment.text}</p>
              <p className="text-sm text-gray-600">{comment.timestamp}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default DishDetail;
