// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

import Header from './components/Header';
import Hero from './components/Hero';
import Suggestions from './components/Suggestions';
import RestaurantList from './components/RestaurantList';
import DishList from './components/DishList';
import Reviews from './components/Reviews';
import DishDetail from './components/DishDetail';
import RestaurantDetail from './components/RestaurantDetail';
import Login from './components/Login';
import Register from './components/Register';
import ExploreRestaurants from './components/ExploreRestaurants'; // 🔥 IMPORT COMPONENT MỚI
import ExploreDishes from './components/ExploreDishes';


import { restaurants, dishes } from './data/mockData';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [waitTimeFilter, setWaitTimeFilter] = useState('');
  const [user, setUser] = useState(null);
  const [allReviews, setAllReviews] = useState([
    {
      user: 'Trần Huy Hoàng',
      rating: 5,
      text: 'Gà rán cay ở Gà Sài Gòn thật sự khiến tôi “trỗi dậy” khi nhắc đến món ăn nóng hổi!',
      dishName: 'Gà rán cay',
      timestamp: '12:30:27 19/5/2025'
    },
    {
      user: 'Lê Thị Hương',
      rating: 4,
      text: 'Phở bò tái ở Phở Hà Nội vừa thơm vừa đậm đà, đúng chất ẩm thực đường phố.',
      dishName: 'Phở bò tái',
      timestamp: '11:45:09 19/5/2025'
    },
    {
      user: 'Cao Văn Nam',
      rating: 5,
      text: 'Bánh mì chảo đã cứu lấy buổi trưa bận rộn của tôi – nhanh gọn và ngon miệng!',
      dishName: 'Bánh mì chảo',
      timestamp: '11:30:20 19/5/2025'
    }
  ]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const handleAddReview = (newReview) => {
    setAllReviews(prev => [newReview, ...prev]);
  };

  return (
    <Router>
      <div className="min-h-screen bg-bg-color text-text-color">
        <Header setSearchQuery={setSearchQuery} user={user} handleLogout={handleLogout} />

        <Routes>
          {/* Trang chủ */}
          <Route
            path="/"
            element={
              <main className="max-w-5xl mx-auto p-6">
                <section id="hero">
                  <Hero />
                </section>
                <section id="suggest">
                  <Suggestions dishes={dishes} />
                </section>
                <section id="restaurants">
                  <RestaurantList
                    restaurants={restaurants}
                    searchQuery={searchQuery}
                    priceFilter={priceFilter}
                    waitTimeFilter={waitTimeFilter}
                    setPriceFilter={setPriceFilter}
                    setWaitTimeFilter={setWaitTimeFilter}
                  />
                </section>
                <section id="dishes">
                  <DishList dishes={dishes} searchQuery={searchQuery} />
                </section>
                <section id="reviews">
                  <Reviews reviews={allReviews.slice(0, 10)} />
                </section>
              </main>
            }
          />

          {/* Trang chi tiết món */}
          <Route
  path="/dish/:id"
  element={<DishDetail dishes={dishes} restaurants={restaurants} user={user} onAddReview={handleAddReview} />}
/>


          {/* Trang chi tiết nhà hàng */}
          <Route
            path="/restaurant/:id"
            element={<RestaurantDetail restaurants={restaurants} user={user} onAddReview={handleAddReview} />}
          />

          {/* Trang khám phá tất cả nhà hàng */}
          <Route
            path="/explore_res"
            element={<ExploreRestaurants restaurants={restaurants} />}
          />
          <Route
            path="/explore-dishes"
            element={<ExploreDishes dishes={dishes} />}
          />

          {/* Trang đăng nhập/đăng ký */}
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/register" element={<Register handleLogin={handleLogin} />} />
        </Routes>

        <footer className="text-center p-4 bg-gray-200 text-sm">
          <p>© 2025 FoodNearU. Made for students ❤️</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
