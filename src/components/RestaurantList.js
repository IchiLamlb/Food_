import React from 'react';
import { Link } from 'react-router-dom';


function RestaurantList({ restaurants, searchQuery, priceFilter, waitTimeFilter, setPriceFilter, setWaitTimeFilter }) {
  // Chỉ lấy nhà hàng có id 1, 2, 3
  const selectedRestaurants = restaurants.filter(restaurant => [2, 4, 6].includes(restaurant.id));

  // Áp dụng các bộ lọc lên 3 nhà hàng đã chọn
  const filteredRestaurants = selectedRestaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = priceFilter ? restaurant.price <= parseInt(priceFilter) : true;
    const matchesWaitTime = waitTimeFilter ? restaurant.waitTime <= parseInt(waitTimeFilter) : true;
    return matchesSearch && matchesPrice && matchesWaitTime;
  });

  return (
    <section id="restaurants" className="my-10">
      <h3 className="text-2xl font-bold text-center mb-3">🏠 Quán ăn nổi bật</h3>

      {/* Nút Khám phá */}
      <div className="flex justify-center mb-5">
        <Link
          to="/explore_res"
          className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg shadow transition duration-200"
        >
          Khám phá
        </Link>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredRestaurants.map(restaurant => (
          <Link to={`/restaurant/${restaurant.id}`} key={restaurant.id} className="card">
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
        ))}
      </div>
    </section>
  );
}

export default RestaurantList;
