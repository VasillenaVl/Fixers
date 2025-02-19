import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Appointments = () => {
  const { professionals } = useContext(AppContext);
  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b-2 border-primary">
        My Appointments
      </p>
      <div>
        {/* макс 3 работници */}
        {professionals.slice(0, 3).map((item, index) => (
          <div
            className="grid grid-cols-3 gap-4 sm:flex sm:gap-6 py-2 border-b-2 border-primary"
            key={index}
          >
            <div>
              <img className="w-44 h-48 bg-indigo-50" src={item.image} alt="" />
            </div>
            <div className="flex-1 text-sm text-zinc-600 ">
              <p className="text-neutral-800 font-semibold">{item.name}</p>
              <p>{item.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1">Address: </p>
              <p className="text-xs">{item.address.line1}</p>
              <p className="text-xs">{item.address.line2}</p>
              <p className="text-zinc-700 font-medium mt-1">Date & Time:</p>
              <p className="text-xs mt-1">21.01.2025 | 8:30 PM</p>
            </div>
            <div></div>
            <div className="flex flex-col gap-2 justify-end">
              <button className="rounded-xl text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-primary hover:text-white transition-all duration-300">
                Pay Now
              </button>
              <button className="rounded-xl text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-900 hover:text-white transition-all duration-300">
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
