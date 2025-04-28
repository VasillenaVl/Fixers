import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContex";
import { assets } from "../../assets/assets";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);
  const { slotDateFormat, currency } = useContext(AppContext);
  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll border-primary border-x-4">
        <div className="bg-gray-200 hidden sm:grid grid-cols-[0.5fr_2.5fr_2fr_3fr_2.5fr_100px_0.5fr] frid-flow-col py-3 px-6 border-b border-primary">
          <p>#</p>
          <p>Client</p>
          <p>Phone</p>
          <p>Date & Time</p>
          <p>Fixer</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
        {appointments.map((item, index) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_2.5fr_2fr_3fr_3fr_100px_0.5fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
            key={index}
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2 text-left">
              <img
                className="w-9 rounded-full"
                src={item.userData.image}
                alt=""
              />{" "}
              <p>{item.userData.name}</p>
            </div>
            <p className="msx-sm:hidden text-left">
              {item.userData.phone || "-"}
            </p>
            <p className="text-left">
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>
            <div className="flex items-center gap-2">
              <img
                className="w-9 rounded-full"
                src={item.fixData.image}
                alt=""
              />{" "}
              <p>{item.fixData.name}</p>
            </div>
            <p>
              {item.amount}
              {currency}
            </p>
            {item.cancelled ? (
              <p className="text-red-400 text-xs font-medium">Cancelled</p>
            ) : (
              <img
                onClick={() => cancelAppointment(item._id)}
                className="w-10 cursor-pointer"
                src={assets.cancel_icon}
                alt=""
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;
