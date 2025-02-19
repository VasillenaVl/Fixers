import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="flex bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10">
      {/* Left side */}
      <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
        <div className="text-lg sm:text-base md:text-xl lg:text-3xl font-semibold text-white z-30">
          <p>Book A Fix Buddy To Help You ! </p>
          <p className="mt-4">Check The Variety Of Professionals</p>
        </div>
        <button
          onClick={() => {
            console.log("button pressed");
            navigate("/login");
            window.scrollTo(0, 0);
          }}
          className="bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all z-30"
        >
          Create account
        </button>
      </div>

      {/* Right side */}
      <div className=" md:block md:w-1/2 lg:w-270px relative z-10">
        <img
          className="hidden sm:block max-w-xl max-h-svh absolute bottom-0 right-[-100px]"
          src={assets.appointment_img}
          alt=""
        />
      </div>
    </div>
  );
};

export default Banner;
