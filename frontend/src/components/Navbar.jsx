import React, { useState } from "react";
import logo from "../assets/logo.png"; // Импортиране на логото
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Navbar = () => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-700">
      <img
        onClick={() => navigate("/")}
        className="w-20 cursor-pointer"
        src={logo}
        alt="FixBuddy Logo"
      />
      <ul className="hidden md:flex item-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/professionals">
          <li className="py-1">PROFESSIONALS</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="contact">
          <li className="py-1">CONTACTS</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>
      <div className="flex item-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              className="w-13 h-12 border-1.3 border-black rounded-full"
              src={assets.profile_pic}
              alt=" "
            />
            <img className="w-2.5" src={assets.dropdown_icon} alt=" " />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              {" "}
              {/* когато сложим мишката върху профилната снимка, тогава да се показват appointments, logout */}
              <div className="min-w-48 bg-stone-100 flex flex-col gap-4">
                <p
                  onClick={() => navigate("account")}
                  className="hover:text-black cursor-pointer"
                >
                  My Account
                </p>
                <p
                  onClick={() => navigate("appointments")}
                  className="hover:text-black cursor-pointer"
                >
                  Appointments
                </p>
                <p
                  onClick={() => setToken(false)}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full front-light hidden md:block"
          >
            Register
          </button>
        )}
        {/* навбарът не се визуализира при малки екрани и затова добавям скрито меню, което се показва само при малки екрани */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden "
          src={assets.menu_icon}
          alt=""
        />
        <div
          className={`${
            showMenu ? "fixed inset-0 w-full h-full" : "h-0 w-0 "
          }md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          {/* fixed inset-0:inset-0 е съкратен начин да зададеш top: 0, right: 0, bottom: 0 и left: 0, което гарантира, че елементът покрива цялата страница. */}
          <div className="flex items-center justify-between px-5 py-6">
            <img className="w-36" src={assets.logo} alt="" />
            <img
              className="w-7"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-t text-lg font-medium">
            <NavLink
              className="px-4 py-2 rounded inline-block"
              onClick={() => setShowMenu(false)}
              to="/"
            >
              <p className="px-4 py-2 rounded inline-block">HOME</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/professionals">
              <p className="px-4 py-2 rounded inline-block">PROFESSIONALS</p>
            </NavLink>
            <NavLink
              className="px-4 py-2 rounded inline-block"
              onClick={() => setShowMenu(false)}
              to="/about"
            >
              <p className="px-4 py-2 rounded inline-block">ABOUT</p>
            </NavLink>
            <NavLink
              className="px-4 py-2 rounded inline-block"
              onClick={() => setShowMenu(false)}
              to="/contact"
            >
              <p className="px-4 py-2 rounded inline-block">CONTACTS</p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
