import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Appointments = () => {
  const { backendUrl, token, getFixersData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);

  const months = [
    " ",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  }; /* за да може форматът на датата за излиза напр. 13 Apr (текущият месец) 2025 */

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse()); // най-новото запазване ше е най-отгоре с reverse()

        console.log(data.appointments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      console.log(appointmentId);

      /* the Promise is the object returned by axios.post(...)
      The await makes the function wait for the Promise to settle (resolve or reject) before moving on*/
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getFixersData(); /* за да може available slots автоматично да се подновяват, без да се рефрешва страницата */
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b-2 border-primary">
        My Appointments
      </p>
      <div>
        {/* макс 3 работници */}
        {appointments.map((item, index) => (
          <div
            className="grid grid-cols-3 gap-4 sm:flex sm:gap-6 py-2 border-b-2 border-primary"
            key={index}
          >
            <div>
              <img
                className="w-44 h-48 bg-indigo-50"
                src={item.fixData.image}
                alt=""
              />
            </div>
            <div className="flex-1 text-sm text-zinc-600 ">
              <p className="text-neutral-800 font-semibold">
                {item.fixData.name}
              </p>
              <p>{item.fixData.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1">Address: </p>
              <p className="text-xs">{item.fixData.address.line1}</p>
              <p className="text-xs">{item.fixData.address.line2}</p>
              <p className="text-zinc-700 font-medium mt-1">
                Date & Time:
                <span />
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>
            <div></div>
            <div className="flex flex-col gap-2 justify-end">
              {!item.cancelled && (
                <button className="rounded-xl text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-primary hover:text-white transition-all duration-300">
                  Pay Now
                </button>
              )}
              {!item.cancelled && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="rounded-xl text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-900 hover:text-white transition-all duration-300"
                >
                  Cancel
                </button>
              )}
              {item.cancelled && (
                <button className="sm:min-w-48 py-2  text-red-500 line-through">
                  Appointment is cancelled
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
