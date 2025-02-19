import { createContext, useEffect } from "react";
import React, { useState } from "react";

export const AdminContext = createContext();
const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    // getter and setter function
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : "" // if we delete the the token from the local storage, it still appears (admin@fixbuddy.com)
  );

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const value = {
    aToken,
    setAToken,
    backendUrl,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
