import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const ProfessionalsContext = createContext();

const ProfessionalsContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [fToken, setFToken] = useState(
    localStorage.getItem("fToken") ? localStorage.getItem("fToken") : ""
  );

  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/professional/appointments",
        {
          headers: { fToken },
        }
      );

      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/professional/complete-appointment",
        { appointmentId },
        { headers: { fToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/professional/cancel-appointment",
        { appointmentId },
        { headers: { fToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    fToken,
    setFToken,
    backendUrl,
    appointments,
    setAppointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  };

  return (
    <ProfessionalsContext.Provider value={value}>
      {props.children}
    </ProfessionalsContext.Provider>
  );
};

export default ProfessionalsContextProvider;
