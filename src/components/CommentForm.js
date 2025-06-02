import React, { useState } from 'react';

function CommentForm({ addComment }) {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() && rating > 0) {
      addComment(comment, rating);
      setComment('');
      setRating(0);
      setHover(0);
    } else {
      alert('Vui lòng nhập bình luận và chọn đánh giá!');
    }
  };

  const handleStarClick = (star) => {
    setRating(star);
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
          <label className="mr-2 block">Đánh giá:</label>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                filled={star <= (hover || rating)}
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {rating > 0 ? `${rating} sao` : 'Chưa đánh giá'}
            </span>
          </div>
        </div>
        <button
          type="submit"
          className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-[#e2584b]"
        >
          Gửi bình luận
        </button>
      </form>
    </div>
  );
}

function Star({ filled, onClick, onMouseEnter, onMouseLeave }) {
  return (
    <svg
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`w-6 h-6 cursor-pointer transition-colors ${filled ? 'text-yellow-400' : 'text-gray-300'
        }`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.462a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.538 1.118l-3.39-2.462a1 1 0 00-1.175 0l-3.39 2.462c-.783.57-1.838-.197-1.538-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.045 9.4c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.974z" />
    </svg>
  );
}

export default CommentForm;
