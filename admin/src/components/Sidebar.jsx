import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { ProfessionalsContext } from "../context/ProfessionalsContext";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { fToken } = useContext(ProfessionalsContext);

  return (
    <div className="min-h-screen bg-white border-r">
      {aToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 md:px-9 md:min-w-60 cursor-pointer ${
                isActive ? "bg-zinc-200 border-r-4 border-primary" : ""
              }`
            }
            to={"/admin-dashboard"}
          >
            <img src={assets.home_icon} alt="" />
            <p>Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 md:px-9 md:min-w-60 cursor-pointer ${
                isActive ? "bg-zinc-200 border-r-4 border-primary" : ""
              }`
            }
            to={"/all-appointments"}
          >
            <img src={assets.appointment_icon} alt="" />
            <p>Appointments</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 md:px-9 md:min-w-60 cursor-pointer ${
                isActive ? "bg-zinc-200 border-r-4 border-primary" : ""
              }`
            }
            to={"/add-fixer"}
          >
            <img src={assets.add_icon} alt="" />
            <p>Add Fixer</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 md:px-9 md:min-w-60 cursor-pointer ${
                isActive ? "bg-zinc-200 border-r-4 border-primary" : ""
              }`
            }
            to={"/fixers-list"}
          >
            <img src={assets.people_icon} alt="" />
            <p>Fixers List</p>
          </NavLink>
        </ul>
      )}

      {fToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 md:px-9 md:min-w-60 cursor-pointer ${
                isActive ? "bg-zinc-200 border-r-4 border-primary" : ""
              }`
            }
            to={"/fixer-dashboard"}
          >
            <img src={assets.home_icon} alt="" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 md:px-9 md:min-w-60 cursor-pointer ${
                isActive ? "bg-zinc-200 border-r-4 border-primary" : ""
              }`
            }
            to={"/fixer-appointments"}
          >
            <img src={assets.appointment_icon} alt="" />
            <p className="hidden md:block">Appointments</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 md:px-9 md:min-w-60 cursor-pointer ${
                isActive ? "bg-zinc-200 border-r-4 border-primary" : ""
              }`
            }
            to={"/fixer-profile"}
          >
            <img src={assets.people_icon} alt="" />
            <p className="hidden md:block">My Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
