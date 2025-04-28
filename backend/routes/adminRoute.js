import express from "express";
import {
  addProfessional,
  allFixers,
  loginAdmin,
  appointmentsAdmin,
  appointmentCancel,
  adminDashboard,
} from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";
import { changeAvailability } from "../controllers/professionalsController.js";

const adminRouter = express.Router();

// post метод за създаване на endpoint
adminRouter.post(
  "/add-professional", // route for adding a fixer ( used in AddFixer )
  authAdmin,
  upload.single("image"),
  addProfessional
);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/all-fixers", authAdmin, allFixers);
adminRouter.post("/change-availability", authAdmin, changeAvailability);
adminRouter.get("/appointments", authAdmin, appointmentsAdmin);
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel);
adminRouter.get("/dashboard", authAdmin, adminDashboard);

export default adminRouter;
