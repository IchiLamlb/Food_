import React from 'react';
import { Link } from 'react-router-dom';

function Header({ user, handleLogout }) {
  return (
    <header className="bg-primary text-white shadow-lg py-4">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/" className="text-3xl font-bold flex items-center hover:text-[#ffe8c2] transition-all">
          <span className="mr-2">🍜</span> FoodNearU
        </Link>

        {/* Navigation */}
        <nav className="flex flex-wrap justify-center gap-2">
          {[
            { id: 'suggest', label: 'Đề xuất' },
            { id: 'restaurants', label: 'Quán ăn' },
            { id: 'dishes', label: 'Món ăn' },
            { id: 'reviews', label: 'Đánh giá' }
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
              className="px-4 py-1.5 bg-white/20 rounded-full hover:bg-white/30 text-sm font-semibold transition"
            >
              {label}
            </button>
          ))}
        </nav>

        {/* User login/logout */}
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="text-sm">👋 Xin chào, <strong>{user.name}</strong></span>
              <button
                onClick={handleLogout}
                className="px-4 py-1.5 bg-white text-primary rounded-full hover:bg-gray-100 transition text-sm font-semibold"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-1.5 bg-white text-primary rounded-full hover:bg-gray-100 transition text-sm font-semibold"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="px-4 py-1.5 bg-white text-primary rounded-full hover:bg-gray-100 transition text-sm font-semibold"
              >
                Đăng ký
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
