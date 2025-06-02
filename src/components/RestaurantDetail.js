import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import CommentForm from './CommentForm';

function RestaurantDetail({ restaurants, user, onAddReview }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const restaurant = restaurants.find(r => r.id === parseInt(id));
  const [comments, setComments] = useState(restaurant ? restaurant.comments : []);

  const addComment = (comment, rating) => {
    const newComment = {
      id: Date.now(),
      user: user.name,
      text: comment,
      rating,
      timestamp: new Date().toLocaleString('vi-VN'),
      restaurantName: restaurant.name,
    };

    setComments(prev => [...prev, newComment]);
    onAddReview(newComment);
  };

  if (!restaurant) {
    return <div className="max-w-5xl mx-auto p-5 text-center text-gray-600 text-lg">Quán ăn không tồn tại</div>;
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

      {/* Ảnh nhà hàng */}
      <div className="w-full rounded-2xl overflow-hidden shadow-lg mb-8">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-auto max-h-[400px] object-cover"
          style={{ display: 'block', margin: '0 auto' }}
        />
      </div>

      {/* Thông tin chi tiết */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-10">
        <h1 className="text-4xl font-bold text-primary mb-3">{restaurant.name}</h1>
        <p className="text-gray-700 mb-5 leading-relaxed">{restaurant.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 text-gray-600 text-sm font-medium mb-6">
          <div className="flex items-center space-x-2">
            <span>💰</span>
            <span>Giá trung bình: <strong>{restaurant.price}K</strong></span>
          </div>
          <div className="flex items-center space-x-2">
            <span>⏱️</span>
            <span>Thời gian chờ: <strong>{restaurant.waitTime} phút</strong></span>
          </div>
          <div className="flex items-center space-x-2">
            <span>📍</span>
            <span>Địa chỉ: <strong>{restaurant.address}</strong></span>
          </div>
          <div className="flex items-center space-x-2">
            <span>🕒</span>
            <span>Giờ mở cửa: <strong>{restaurant.openTime}</strong> - <strong>{restaurant.closeTime}</strong></span>
          </div>
        </div>

        {/* Bản đồ Google Maps */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">🗺️ Vị trí trên bản đồ</h3>
          <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
            <iframe
              title="Google Map"
              width="100%"
              height="350"
              frameBorder="0"
              style={{ border: 0 }}
              src={`https://www.google.com/maps?q=${encodeURIComponent(restaurant.address)}&output=embed`}
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      {/* Bình luận */}
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

export default RestaurantDetail;
