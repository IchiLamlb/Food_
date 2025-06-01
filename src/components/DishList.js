import React from 'react';
import { Link } from 'react-router-dom';

function DishList({ dishes, searchQuery }) {
  // Chỉ lấy các món có id là 1, 2, 3
  const selectedDishes = dishes.filter(dish => [1, 2, 3].includes(dish.id));

  // Áp dụng tìm kiếm trên 3 món này (nếu có searchQuery)
  const filteredDishes = selectedDishes.filter(dish =>
    dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dish.restaurant.toLowerCase().includes(searchQuery.toLowerCase())
 );

  return (
    <section id="dishes" className="my-10">
      <h3 className="text-2xl font-bold text-center mb-3">🍲 Món ăn phổ biến</h3>

      {/* Nút Khám phá */}
      <div className="flex justify-center mb-5">
        <Link
          to="/explore-dishes"
          className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg shadow transition duration-200"
        >
          Khám phá
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDishes.map(dish => (
          <Link to={`/dish/${dish.id}`} key={dish.id} className="card">
            <div className="image-container-no-overlay">
              <img src={dish.image} alt={dish.name} />
            </div>
            <div className="p-4">
              <h4 className="text-lg font-semibold">{dish.name}</h4>
              <p>{dish.restaurant} · {dish.rating}⭐ · {dish.distance}m</p>
              <p className="text-sm text-primary italic">{dish.slogan}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default DishList;
