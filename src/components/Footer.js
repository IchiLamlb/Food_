import React from 'react';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: 'rgb(255, 111, 97)' }} className="text-white mt-12">
            <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between text-sm">
                <p className="text-center md:text-left font-medium">
                    © 2025 <span className="font-semibold">FoodNearU</span>. Made for students ❤️
                </p>
                <div className="flex space-x-4 mt-2 md:mt-0">
                    <a href="/about" className="hover:underline hover:text-yellow-200 transition">Giới thiệu</a>
                    <a href="http://ffacebook.com/lelam2411/" className="hover:underline hover:text-yellow-200 transition">Liên hệ</a>
                    <a href="/terms" className="hover:underline hover:text-yellow-200 transition">Điều khoản</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
