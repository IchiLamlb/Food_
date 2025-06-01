// CommentForm.js
import React, { useState } from 'react';

function CommentForm({ addComment }) {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      addComment(comment, rating);
      setComment('');
      setRating(5);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg mb-5">
      <h4 className="text-lg font-semibold mb-2">Thêm bình luận</h4>
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Nhập bình luận của bạn..."
          className="w-full p-2 border rounded-lg mb-2"
          rows="4"
        />
        <div className="mb-2">
          <label className="mr-2">Đánh giá:</label>
          <select
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            className="p-1 border rounded"
          >
            {[1, 2, 3, 4, 5].map(star => (
              <option key={star} value={star}>{star} sao</option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-[#e2584b]">
          Gửi bình luận
        </button>
      </form>
    </div>
  );
}

export default CommentForm;