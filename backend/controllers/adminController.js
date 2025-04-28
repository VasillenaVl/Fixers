import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import professionalModel from "../models/professionalsModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";

// API за добавяне на  работници

const addProfessional = async (req, res) => {
  try {
    //ако файлът не бъде изпратен правилно, ще върне undefined или null за req.file
    console.log("Received req.body:", req.body);
    console.log("Received req.file:", req.file);

    const {
      name,
      email,
      password,
      speciality,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;

    // checking if the image is available

    if (!imageFile) {
      return res.json({ success: false, message: "Image is required" });
    }

    // checking for all data to add professional

    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // validating email format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // validating a strong password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // hashing professional password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // upload an image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    const professionalData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };

    console.log("Professional data before saving:", professionalData.date); // checking if its working

    const newProfessional = new professionalModel(professionalData);
    await newProfessional.save();

    res.json({ success: true, message: "New Fixer Added" });

    // console.log(
    //   {
    //     name,
    //     email,
    //     password,
    //     speciality,
    //     experience,
    //     about,
    //     fees,
    //     address,
    //   },
    //   imageFile
    // );
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API For admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all fixers list for admin panel
const allFixers = async (req, res) => {
  try {
    const fixers = await professionalModel.find({}).select("-password");
    res.json({ success: true, fixers });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all appointments list
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to cancel appointments

const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // releasing fixers slot

    const { fixId, slotDate, slotTime } = appointmentData;

    const fixData = await professionalModel.findById(fixId);

    let slots_booked = fixData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );

    await professionalModel.findByIdAndUpdate(fixId, { slots_booked });

    res.json({ success: true, message: " The appointment is cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get dashboard data for admin panel

const adminDashboard = async (req, res) => {
  try {
    const fixers = await professionalModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});

    const dashData = {
      fixers: fixers.length,
      appointments: appointments.length,
      clients: users.length,
      newestAppointments: [...appointments].reverse().slice(0, 5),
      // [...appointments] - creates a shallow copy of the array before reversing to prevent bugs
      // reverse () -  the last item becomes first
      // slice(0,5) - takes a copy of the first 5 elements in the now-reversed array ( so we get the newest 5 elements)
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  addProfessional,
  loginAdmin,
  allFixers,
  appointmentsAdmin,
  appointmentCancel,
  adminDashboard,
};
