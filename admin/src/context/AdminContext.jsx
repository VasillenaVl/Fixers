import { createContext } from "react";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();
const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    // getter and setter function
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : "" // if we delete the the token from the local storage, it still appears (admin@fixbuddy.com)
  );
  const [fixers, setFixers] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [dashData, setDashData] = useState(false); // everything form the dashboard will be saved here

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Getting all fixers data from db using API
  const getAllFixers = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-fixers",
        {}, // empty because we are not defining anything in the body
        { headers: { aToken } }
      );
      if (data.success) {
        setFixers(data.fixers);
        console.log(data.fixers);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeAvailability = async (fixId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availability",
        { fixId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllFixers();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/appointments", {
        headers: { aToken },
      });

      if (data.success) {
        setAppointments(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/cancel-appointment",
        { appointmentId },
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/dashboard", {
        headers: { aToken },
      });

      if (data.success) {
        setDashData(data.dashData);
        console.log(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    aToken,
    setAToken,
    backendUrl,
    fixers,
    getAllFixers,
    changeAvailability,
    appointments,
    setAppointments,
    getAllAppointments,
    cancelAppointment,
    dashData,
    getDashData,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
