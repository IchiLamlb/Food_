import React from 'react';
import { Link } from 'react-router-dom';

function Header({ setSearchQuery, user, handleLogout }) {
  return (
    <header className="bg-primary text-white p-4 shadow-xl relative">
      {/* Nút đăng nhập/đăng ký ở góc trên bên phải */}
      <div className="absolute top-4 right-4 flex gap-2">
        {user ? (
          <>
            <span className="font-semibold text-sm">Xin chào, {user.name}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-[#fff5e1] text-primary rounded-lg hover:bg-[#ffe8c2] transition-colors font-semibold whitespace-nowrap"
            >
              Đăng xuất
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 bg-[#fff5e1] text-primary rounded-lg hover:bg-[#ffe8c2] transition-colors font-semibold whitespace-nowrap"
            >
              Đăng nhập
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-[#fff5e1] text-primary rounded-lg hover:bg-[#ffe8c2] transition-colors font-semibold whitespace-nowrap"
            >
              Đăng ký
            </Link>
          </>
        )}
      </div>

      {/* Phần chính: Logo + Tìm kiếm + Navigation */}
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Logo/Title - Căn trái */}
        <div className="flex items-center">
            <Link to="/" className="text-3xl font-bold flex items-center hover:text-[#ffe8c2] transition-all">
            <span className="mr-2">🍜</span> FoodNearU
            </Link>
        </div>

        {/* Search Bar và Navigation */}
        <div className="w-full flex flex-col items-center">
          {/* Search Bar */}
          <div className="w-full sm:w-[400px] flex items-center bg-white rounded-lg overflow-hidden shadow-md mb-2">
            <input
              type="search"
              placeholder="Tìm món ăn, quán ăn..."
              className="w-full p-3 text-black focus:outline-none"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="bg-[#e2584b] text-white p-3 hover:bg-[#c14f40] transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35m0 0A7 7 0 1114.65 6.65a7 7 0 012.3 10.3z"
                />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex space-x-2">
            <button
                onClick={() => document.getElementById('suggest')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-4 py-2 bg-[#fff5e1] text-primary rounded-lg hover:bg-[#ffe8c2] transition-colors font-semibold"
            >
                Đề xuất
            </button>
            <button
                onClick={() => document.getElementById('restaurants')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-4 py-2 bg-[#fff5e1] text-primary rounded-lg hover:bg-[#ffe8c2] transition-colors font-semibold"
            >
                Quán ăn
            </button>
            <button
                onClick={() => document.getElementById('dishes')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-4 py-2 bg-[#fff5e1] text-primary rounded-lg hover:bg-[#ffe8c2] transition-colors font-semibold"
            >
                Món ăn
            </button>
            <button
                onClick={() => document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-4 py-2 bg-[#fff5e1] text-primary rounded-lg hover:bg-[#ffe8c2] transition-colors font-semibold"
            >
                Đánh giá
            </button>
            </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
