import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/homepage/logo-white.png"; // Adjust the path as needed

const Header = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const username = localStorage.getItem("username");
        setIsLoggedIn(!!username); // Set true if username exists
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("username");
        setIsLoggedIn(false);
        navigate("/login");
    };

    return (
        <header className="font-sans bg-gray-100">
            {/* Header Top */}
            <div className="flex flex-col sm:flex-row justify-between items-center sm:px-20 px-4 py-2 bg-gray-800 text-white text-sm">
                <div className="flex items-center space-x-4">
                    <span>📞 (+84) 123456789</span>
                    <span>📧 sumimasen@gmail.com</span>
                </div>
                <div className="flex mt-2 sm:mt-0 space-x-3">
                    <a href="#" className="text-white hover:text-gray-400">
                        <i className="fab fa-facebook"></i>
                    </a>
                    <a href="#" className="text-white hover:text-gray-400">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" className="text-white hover:text-gray-400">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#" className="text-white hover:text-gray-400">
                        <i className="fab fa-github"></i>
                    </a>
                </div>
            </div>

            {/* Header Bottom */}
            <div className="flex flex-col md:flex-row justify-between items-center px-4 py-6">
                {/* Logo Section */}
                <div className="flex items-center space-x-3">
                    <img src={logo} alt="Logo" className="w-12 h-12 object-cover" />
                    <h1 className="text-2xl text-gray-800">FoodNearU</h1>
                </div>

                {/* Navigation Links */}
                <nav className="mt-4 md:mt-0">
                    <ul className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8">
                        <li>
                            <a
                                href="/"
                                className="text-gray-800 font-semibold hover:text-gray-600 no-underline"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="/menu"
                                className="text-gray-800 font-semibold hover:text-gray-600 no-underline"
                            >
                                Đề xuất
                            </a>
                        </li>
                        <li>
                            <a
                                href="/suggest/anket"
                                className="text-gray-800 font-semibold hover:text-gray-600 no-underline"
                            >
                                おすすめ
                            </a>
                        </li>
                        <li>
                            <a
                                href="/favorites"
                                className="text-gray-800 font-semibold hover:text-gray-600 no-underline"
                            >
                                お気に入り
                            </a>
                        </li>
                    </ul>
                </nav>

                {/* Sign Out Button */}
                {isLoggedIn && (
                    <button
                        onClick={handleLogout}
                        className="mt-4 md:mt-0 px-4 py-2 bg-white border border-gray-800 rounded-full hover:bg-gray-200 transition"
                    >
                        サインアウト
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;
