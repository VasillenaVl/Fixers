import React, { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointments from "./pages/Admin/AllAppointments";
import AddFixer from "./pages/Admin/AddFixer";
import FixersList from "./pages/Admin/FixersList";
import { ProfessionalsContext } from "./context/ProfessionalsContext";
import FixerDashboard from "./pages/Fixer/FixerDashboard";
import FixerAppointment from "./pages/Fixer/FixerAppointment";
import FixerProfile from "./pages/Fixer/FixerProfile";

const App = () => {
  const { aToken } = useContext(AdminContext);

  const { fToken } = useContext(ProfessionalsContext);

  return aToken || fToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          {/* Admin Routes */}
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-appointments" element={<AllAppointments />} />
          <Route path="/add-fixer" element={<AddFixer />} />
          <Route path="/fixers-list" element={<FixersList />} />

          {/* Fixer Routes */}
          <Route path="/fixer-dashboard" element={<FixerDashboard />} />
          <Route path="/fixer-appointments" element={<FixerAppointment />} />
          <Route path="/fixer-profile" element={<FixerProfile />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;
