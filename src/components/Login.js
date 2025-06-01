import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login({ handleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { name: email.split('@')[0], email };
    handleLogin(userData);
    navigate('/');
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-yellow-50 px-4">
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-primary">🍜 Đăng nhập</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Nhập email của bạn"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Nhập mật khẩu của bạn"
              required
            />
          </div>
          <button type="submit" className="w-full py-3 bg-gradient-to-r from-primary to-orange-500 text-white rounded-xl text-lg font-semibold hover:opacity-90 transition">
            Đăng nhập
          </button>
        </form>
        <p className="text-center mt-6">
          Chưa có tài khoản? <Link to="/register" className="text-primary font-semibold hover:underline">Đăng ký ngay</Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
