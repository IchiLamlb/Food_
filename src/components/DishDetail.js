import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import CommentForm from './CommentForm';

function DishDetail({ dishes, restaurants, user, onAddReview }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const dish = dishes.find(d => d.id === parseInt(id));
  const [comments, setComments] = useState(dish ? dish.comments : []);

  // Cần tìm quán dựa vào dish.restaurant hoặc dish.restaurantId, hiện đang sai là dish.id
  const restaurant = restaurants.find(r => r.name === dish?.restaurant);

  const addComment = (comment, rating) => {
    const newComment = {
      id: Date.now(),
      user: user.name,
      text: comment,
      rating,
      timestamp: new Date().toLocaleString('vi-VN'),
      dishName: dish.name,
    };
    setComments(prev => [...prev, newComment]);
    onAddReview(newComment);
  };

  if (!dish) {
    return <div className="max-w-5xl mx-auto p-5 text-center text-gray-600 text-lg">Món ăn không tồn tại</div>;
  }

  return (
    <main className="max-w-5xl mx-auto p-5 w-full">
      {/* Nút quay lại */}
      <span
        onClick={() => navigate(-1)}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => { if (e.key === 'Enter') navigate(-1); }}
        className="inline-flex items-center text-[#e2584b] hover:text-[#c14f40] cursor-pointer mb-5 font-semibold transition-colors select-none"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Quay lại
      </span>

      {/* Ảnh món ăn */}
      <div className="w-full rounded-2xl overflow-hidden shadow-lg mb-8">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-auto max-h-[400px] object-cover"
          style={{ display: 'block', margin: '0 auto' }}
        />
      </div>

      {/* Thông tin món ăn & quán */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-10">
        <h1 className="text-4xl font-bold mb-3 text-primary">{dish.name}</h1>
        <p className="text-lg mb-2 flex flex-wrap items-center gap-3">
          <Link
            to={`/restaurant/${restaurant?.id ?? ''}`}
            className="text-blue-600 hover:underline font-semibold"
          >
            {dish.restaurant}
          </Link>
          <span>·</span>
          <span className="text-yellow-500 font-semibold">{dish.rating}⭐</span>
          <span>·</span>
          <span>{dish.distance}m</span>
        </p>
        <p className="text-primary italic mb-3">{dish.slogan}</p>

        <p className="leading-relaxed text-gray-700">{dish.description || 'Món ăn thơm ngon, phù hợp cho sinh viên!'}</p>
        {restaurant && (
          <p className="text-sm text-gray-600 mb-4 flex items-center gap-2">
            <span>📍</span> Địa chỉ: {restaurant.address}
          </p>
        )}
      </div>

      {/* Bình luận & đánh giá */}
      <section>
        <h2 className="text-3xl font-semibold text-primary mb-6">💬 Bình luận & đánh giá</h2>

        {user ? (
          <CommentForm addComment={addComment} />
        ) : (
          <p className="text-red-500 mb-6">
            Vui lòng <Link to="/login" className="text-primary underline">đăng nhập</Link> để bình luận.
          </p>
        )}

        <div className="space-y-6">
          {comments.length === 0 ? (
            <p className="text-gray-500 italic">Chưa có bình luận nào.</p>
          ) : (
            comments.map(comment => (
              <div
                key={comment.id}
                className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold text-gray-800">{comment.user}</span>
                  <span className="text-yellow-500 text-lg">{comment.rating} ⭐</span>
                </div>
                <p className="text-gray-700 mb-2">{comment.text}</p>
                <p className="text-xs text-gray-400">{comment.timestamp}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

export default DishDetail;
