import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Professionals from "./pages/Professionals";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Account from "./pages/Account";
import Appointments from "./pages/Appointments";
import Navbar from "./components/Navbar";
import Appointment from "./pages/Appointment";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="w-[85%] mx-auto sm:w-[85%]">
      {/*ще е с ширина 85% от екрана, автоматично ще има разстояния и от двете страни, стилът ще се прилага на екрани с ширина, равна или по-голяма от sm (обикновено 640px). */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/professionals" element={<Professionals />} />
        <Route path="/professionals/:speciality" element={<Professionals />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/account" element={<Account />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/appointment/:fixId" element={<Appointment />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
