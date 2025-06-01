// RestaurantDetail.js
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import CommentForm from './CommentForm';

function RestaurantDetail({ restaurants, user, onAddReview }) {
  const { id } = useParams();
  const restaurant = restaurants.find(r => r.id === parseInt(id));
  const [comments, setComments] = useState(restaurant ? restaurant.comments : []);

  const addComment = (comment, rating) => {
    const newComment = {
      id: Date.now(), // dùng timestamp làm ID tránh trùng
      user: user.name,
      text: comment,
      rating,
      timestamp: new Date().toLocaleString('vi-VN'),
      restaurantName: restaurant.name, // thêm tên quán để Reviews hiển thị
    };

    setComments(prev => [...prev, newComment]);
    onAddReview(newComment); // Gửi toàn bộ comment lên Reviews
  };

  if (!restaurant) {
    return <div className="max-w-5xl mx-auto p-5">Quán ăn không tồn tại</div>;
  }

  return (
    <main className="max-w-5xl mx-auto p-4">
      <Link to="/" className="text-primary hover:underline mb-5 inline-block">← Quay lại</Link>

      <div className="bg-white shadow-lg rounded-2xl overflow-hidden mb-10">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-[250px] object-cover"
        />
        <div className="p-6">
          <h2 className="text-3xl font-bold text-primary mb-2">{restaurant.name}</h2>
          <p className="text-gray-700 mb-4">{restaurant.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
            <p>💰 <span className="font-semibold">Giá trung bình:</span> {restaurant.price}K</p>
            <p>⏱️ <span className="font-semibold">Thời gian chờ:</span> {restaurant.waitTime} phút</p>
            <p>📍 <span className="font-semibold">Địa chỉ:</span> {restaurant.address}</p>
          </div>
        </div>
      </div>

      <section className="mt-8">
        <h3 className="text-2xl font-semibold text-primary mb-4">💬 Bình luận & đánh giá</h3>

        {user ? (
          <CommentForm addComment={addComment} />
        ) : (
          <p className="text-red-500 mb-4">
            Vui lòng <Link to="/login" className="text-primary underline">đăng nhập</Link> để bình luận.
          </p>
        )}

        <div className="space-y-4">
          {comments.length === 0 && (
            <p className="text-gray-500 italic">Chưa có bình luận nào.</p>
          )}
          {comments.map(comment => (
            <div key={comment.id} className="bg-gray-50 border rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-800">{comment.user}</span>
                <span className="text-yellow-500">{comment.rating} ⭐</span>
              </div>
              <p className="text-gray-700 mb-1">{comment.text}</p>
              <p className="text-sm text-gray-400">{comment.timestamp}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default RestaurantDetail;