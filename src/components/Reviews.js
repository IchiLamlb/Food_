// Review.js
import React from 'react';

function Reviews({ reviews }) {
  return (
    <section id="reviews" className="my-10">
      <h3 className="text-2xl font-bold text-center mb-5">💬 Đánh giá gần đây</h3>
      <div className="bg-white rounded-lg shadow-lg p-5">
        {reviews.map((review, index) => (
          <div key={index} className="mb-4 border-b pb-2 last:border-b-0">
            <p className="font-semibold">{review.user} ({review.rating}⭐)</p>
            {review.restaurantName && <p className="text-sm italic text-gray-600">Tại: {review.restaurantName}</p>}
            {review.dishName && <p className="text-sm italic text-gray-600">Món: {review.dishName}</p>}
            <p>{review.text}</p>
            <p className="text-xs text-gray-500">{review.timestamp}</p>
          </div>
        ))}
        {reviews.length === 0 && <p className="text-gray-500 italic">Chưa có đánh giá nào.</p>}
      </div>
    </section>
  );
}

export default Reviews;