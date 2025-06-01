import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Filter from '../components/Filter'; // Cập nhật lại path nếu khác

function ExploreRes({ restaurants }) {
    const [priceFilter, setPriceFilter] = useState('');
    const [waitTimeFilter, setWaitTimeFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    // Lọc theo search + filter
    const filteredRestaurants = restaurants.filter(restaurant => {
        const matchesSearch =
            restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            restaurant.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesPrice = priceFilter ? restaurant.price <= parseInt(priceFilter) : true;
        const matchesWaitTime = waitTimeFilter ? restaurant.waitTime <= parseInt(waitTimeFilter) : true;

        return matchesSearch && matchesPrice && matchesWaitTime;
    });

    return (
        <main className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-6">🍽️ Tất cả quán ăn</h2>

            {/* Thanh tìm kiếm nổi bật */}
            <div className="flex justify-center mb-6">
                <div className="relative w-full max-w-md">
                    <input
                        type="text"
                        placeholder="🔍 Tìm kiếm quán ăn theo tên hoặc mô tả..."
                        className="w-full p-3 pl-10 rounded-xl text-base text-black border-2 border-orange-500 focus:border-orange-600 focus:ring-2 focus:ring-orange-300 shadow-md transition duration-200"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {/* Icon kính lúp bên trái (tuỳ chọn nếu không dùng emoji trong placeholder) */}
                    {/* <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" />
      </svg>
    </span> */}
                </div>
            </div>


            {/* Bộ lọc */}
            <Filter setPriceFilter={setPriceFilter} setWaitTimeFilter={setWaitTimeFilter} />

            {/* Danh sách quán ăn */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRestaurants.length > 0 ? (
                    filteredRestaurants.map((restaurant) => (
                        <Link
                            to={`/restaurant/${restaurant.id}`}
                            key={restaurant.id}
                            className="card"
                        >
                            <div className="image-container-no-overlay">
                                <img src={restaurant.image} alt={restaurant.name} />
                            </div>
                            <div className="p-4">
                                <h4 className="text-lg font-semibold">{restaurant.name}</h4>
                                <p>{restaurant.description}</p>
                                <p className="text-sm text-gray-600">Giá trung bình: {restaurant.price}K</p>
                                <p className="text-sm text-gray-600">Thời gian chờ: {restaurant.waitTime} phút</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className="text-center col-span-full text-gray-500 italic">Không có quán nào phù hợp.</p>
                )}
            </div>
        </main>
    );
}

export default ExploreRes;
