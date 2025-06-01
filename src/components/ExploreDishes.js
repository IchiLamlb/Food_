import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ExploreDishes({ dishes }) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredDishes = dishes.filter(dish =>
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.restaurant.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className="max-w-5xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-6">🍛 Tất cả món ăn</h2>

            {/* Thanh tìm kiếm nổi bật */}
            <div className="flex justify-center mb-6">
                <div className="relative w-full max-w-md">
                    <input
                        type="text"
                        placeholder="🔍 Tìm kiếm món ăn hoặc nhà hàng..."
                        className="w-full p-3 pl-10 rounded-xl text-base text-black border-2 border-orange-500 focus:border-orange-600 focus:ring-2 focus:ring-orange-300 shadow-md transition duration-200"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </main>
    );
}

export default ExploreDishes;
