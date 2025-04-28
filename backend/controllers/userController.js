import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import professionalModel from "../models/professionalsModel.js";
import appointmentModel from "../models/appointmentModel.js";

// API to register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !password || !email) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // validating email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter A Valid Email" });
    }

    // validating a strong password
    if (password.length < 8) {
      return res.json({ success: false, message: "Enter A Stronger Password" });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10); // number of rounds
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save(); // saving the new user in the db

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User Does Not Exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
    const userData = await userModel.findById(userId).select("-password");
    res.json({ success: true, userData });
  }
};

// API to get user profile data
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");
    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to update user profile
const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.imageFile;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }
    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });

    if (imageFile) {
      // upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resourse_type: "image",
      });
      const imageUrl = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(userId, { image: imageUrl });
    }

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to book appointment
const bookAppointment = async (req, res) => {
  try {
    const { userId, fixId, slotDate, slotTime } = req.body;

    console.log("🔵 Request received:", { userId, fixId, slotDate, slotTime });

    await professionalModel.findByIdAndUpdate(fixId, { available: true });

    const fixData = await professionalModel.findById(fixId).select("-password");
    console.log("🔵 Fixer data:", fixData);
    console.log("fixData.available:", fixData.available);

    if (!fixData.available) {
      return res.json({
        success: false,
        message: "The fixer is not available",
      });
    }

    let slots_booked = fixData.slots_booked;

    // checking for slot availability
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot not available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    console.log("🟢 Slots booked updated:", slots_booked);

    const userData = await userModel.findById(userId).select("-password");

    console.log("🔵 User data:", userData);

    delete fixData.slots_booked;

    const appointmentData = {
      userId,
      fixId,
      userData,
      fixData,
      amount: fixData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    console.log("🟢 Appointment data before saving:", appointmentData);

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    console.log("✅ Appointment successfully saved!");

    // save new slots data in fixData
    await professionalModel.findByIdAndUpdate(fixId, { slots_booked });

    res.json({ success: true, message: "You have booked an appointment" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get user appointments for frontend appointments page
const listAppointment = async (req, res) => {
  try {
    const { userId } = req.body;
    const appointments = await appointmentModel.find({ userId });

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to cancel appointments
const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    console.log("cancelled");

    // verify  appointment user
    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized action" });
    }

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

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
};
