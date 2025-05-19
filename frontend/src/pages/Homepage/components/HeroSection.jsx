import React from "react";
import { useNavigate } from "react-router-dom";
import heroBanner from "../../../assets/images/homepage/hero-banner.png";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section
      className="flex flex-col items-center justify-center text-center p-[60px] bg-[#fdfdfd] min-h-[600px] bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBanner})` }}
    >
      <div className="max-w-[600px]">
        <h1 className="text-[80px] text-[#333] mb-5">
          Khám phá món ăn quanh Hust
        </h1>
        <div className="flex justify-center gap-5">
          <button
            onClick={() => navigate("/menu")}
            className="py-3 px-5 text-[16px] bg-[#c51d1d] text-white rounded-[30px] cursor-pointer"
          >
            Bộ lọc
          </button>
          <button
            onClick={() => navigate("/menu")}
            className="py-[10px] px-5 text-[16px] bg-white text-[#333] border-1 border-[#333] rounded-[30px] cursor-pointer"
          >
            Đề xuất
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
