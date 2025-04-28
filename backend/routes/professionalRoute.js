import express from "express";
import {
  professionalList,
  loginFixer,
  appointmentsFixer,
  appointmentComplete,
  appointmentCancel,
} from "../controllers/professionalsController.js";
import authFixer from "../middlewares/authFixer.js";

const professionalRouter = express.Router();

professionalRouter.get("/list", professionalList);
professionalRouter.post("/login", loginFixer);
professionalRouter.get("/appointments", authFixer, appointmentsFixer);
professionalRouter.post(
  "/complete-appointment",
  authFixer,
  appointmentComplete
);
professionalRouter.post("/cancel-appointment", authFixer, appointmentCancel);

export default professionalRouter;
