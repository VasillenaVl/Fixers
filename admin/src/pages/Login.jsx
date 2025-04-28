import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { ProfessionalsContext } from "../context/ProfessionalsContext";

const Login = () => {
  const [state, setState] = useState("Admin");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const { setAToken, backendUrl } = useContext(AdminContext);

  const { setFToken } = useContext(ProfessionalsContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // Admin Login
    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });
        if (data.success) {
          //console.log(data.token);

          localStorage.setItem("aToken", data.token); // so we can store the token (email and pass) in the local storage
          setAToken(data.token);
        } else {
          toast.error(data.message);
        }

        // Fixer Login
      } else {
        const { data } = await axios.post(
          backendUrl + "/api/professional/login",
          { email, password }
        );
        if (data.success) {
          //console.log(data.token);

          localStorage.setItem("fToken", data.token); // so we can store the token (email and pass) in the local storage
          setFToken(data.token);
          console.log(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {}
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg ">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">{state}</span> Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)} // OnChange - input, textarea, select
            value={email}
            className="border border-zinc-300 rounded w-full  p-2 mt-1 "
            type="email"
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value.trim())}
            value={password}
            className="border border-zinc-300 rounded w-full  p-2 mt-1 "
            type="password"
            required
          />
        </div>
        <button className="bg-primary text-white w-full py-2 rounded-md text-base">
          Login
        </button>
        {state === "Admin" ? (
          <p>
            Fixer Login?{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setState("Fixer")}
            >
              {" "}
              Click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{""}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setState("Admin")}
            >
              {" "}
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
