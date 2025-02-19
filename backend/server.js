import express from "express";
import cors from "cors";
import multer from "multer";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";

const upload = multer({ dest: "uploads/" });

// app configdfc
const app = express();
const port = process.env.PORT || 4000;
connectDB(); // проверяваме терминала дали дб се е свързала
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors()); // backend се свързва с frontend

// api endpoints

app.use("/api/admin", adminRouter);

// localhost:4000/api/admin-professional

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(port, () => console.log("Server Started", port));
