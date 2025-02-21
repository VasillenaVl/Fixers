import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AdminContextProvider from "./context/AdminContext.jsx";
import ProfessionalsContextProvider from "./context/ProfessionalsContext.jsx";
import AppContextProvider from "./context/AppContex.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AdminContextProvider>
      <ProfessionalsContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </ProfessionalsContextProvider>
    </AdminContextProvider>
  </BrowserRouter>
);
