import React from "react";
import { useContext } from "react";
import { ProfessionalsContext } from "../../context/ProfessionalsContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContex";
import { assets } from "../../assets/assets";
import { appointmentCancel } from "../../../../backend/controllers/professionalsController";

const FixerAppointment = () => {
  const {
    fToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(ProfessionalsContext);

  const { slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (fToken) {
      getAppointments();
    }
  }, [fToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium ">All Appointmens</p>

      <div className="bg-white border-rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_1fr_1fr_1.5fr_1.5fr_1fr_1fr] gap-1 py-3 px-6 border-b">
          <p>#</p>
          <p>Client</p>
          <p>Payment</p>
          <p>Number</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {appointments.map((item, index) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_1fr_1fr_1.5fr_1.5fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-3 border-b hover:bg-gray-50"
            key={index}
          >
            <p>{index + 1}</p>
            <div>
              <img src={item.userData.image} alt="" />{" "}
              <p>{item.userData.name}</p>
            </div>
            <div>
              <p>
                <span>-</span>
              </p>
            </div>
            <p>{item.userData.phone}</p>
            <p>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>
            <p>
              {currency} {item.amount}
            </p>
            <div>
              <img
                onClick={() => cancelAppointment(item._id)}
                src={assets.cancel_icon}
                alt=""
              />
              <img
                onClick={() => appointmentCancel(item._id)}
                src={assets.tick_icon}
                alt=""
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FixerAppointment;
