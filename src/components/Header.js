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
        <nav className="flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="px-6 py-3 bg-white/20 rounded-full hover:bg-white/30 text-base font-semibold transition"
          >
            Đề xuất
          </Link>
          <Link
            to="/explore_res"
            className="px-6 py-3 bg-white/20 rounded-full hover:bg-white/30 text-base font-semibold transition"
          >
            Quán ăn
          </Link>
          <Link
            to="/explore-dishesL"
            className="px-6 py-3 bg-white/20 rounded-full hover:bg-white/30 text-base font-semibold transition"
          >
            Món ăn
          </Link>
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
