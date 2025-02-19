import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500 font-medium">
        <p>
          WHO <span className="text-gray-600 font-medium">ARE</span>{" "}
          <span className="text-gray-700 font-medium">WE</span>
          <span className="text-gray-900 font-semibold">?</span>
        </p>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-12 items-end">
        {" "}
        {/* items-end: снимката и текста са подравнени отдолу */}
        <img
          className="w-96 h-80 md:max-w-[360px]"
          src={assets.about_image}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-3/4 text-sm text-gray-600">
          <p>
            Welcome to <span>FixBuddy</span>! We understand that home
            maintenance can be challenging and time-consuming. Whether it's a
            leaky faucet, an electrical issue, or a garden in need of care,
            finding the right professional should be simple and stress-free.
            That's why we’re here – to connect you with skilled, dependable
            experts who can handle all your home repair needs with ease.
          </p>
          <p>
            We’re passionate about empowering homeowners to maintain their
            spaces without the hassle, and we’re equally committed to providing
            skilled professionals with opportunities to grow their businesses.
          </p>
          <b className="text-gray-800">Our Vision</b>
          <p>
            We aim to be the go-to platform for all home repair needs, fostering
            trust and reliability in every interaction. At FixBuddy, we’re
            building a community where fixing your home feels as easy as calling
            a buddy. Let us help you keep your home running smoothly – because
            life is better when everything works.
          </p>
        </div>
      </div>

      <div className="text-xl my-4">
        <p>
          Why Choose{" "}
          <span className="text-gray-700  font-semibold">FixBuddy ?</span>
        </p>
      </div>

      {/* grid is more flexible for complex layouts compared to flex. */}
      <div className="grid md:grid-cols-2 gap-12 items-start mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-16 grid gap-4 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Trusted Professionals</b>
          <p>
            Every expert on FixBuddy is thoroughly vetted and qualified to
            deliver high-quality service.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 grid gap-4 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Wide Range of Services</b>
          <p>
            From plumbing and electrical work to carpentry and gardening, we’ve
            got you covered.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 grid gap-4 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Convenient Booking</b>
          <p>Easily schedule appointments that fit your busy life.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 grid gap-4 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Transparent Pricing</b>
          <p>No surprises – get clear, upfront pricing for every service</p>
        </div>
      </div>
    </div>
  );
};

export default About;
