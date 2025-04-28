import professionalModel from "../models/professionalsModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

const changeAvailability = async (req, res) => {
  try {
    const { fixId } = req.body;
    const fixData = await professionalModel.findById(fixId);
    await professionalModel.findByIdAndUpdate(fixId, {
      available: !fixData.available,
    });
    res.json({ success: true, message: "Availability Changed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const professionalList = async (req, res) => {
  try {
    const professionals = await professionalModel
      .find({})
      .select(["-password", "-email"]);
    {
      /* find({}), за да включим всички фиксъри и селект, за да не се визуализират във фронтенда паролата и имела */
    }

    res.json({ success: true, professionals });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for fixer Login
const loginFixer = async (req, res) => {
  try {
    const { email, password } = req.body;
    const fixer = await professionalModel.findOne({ email });

    if (!fixer) {
      return res.json({ success: false, message: "Non existing fixer" });
    }

    const isMatch = await bcrypt.compare(password, fixer.password);

    if (isMatch) {
      const token = jwt.sign({ id: fixer._id }, process.env.JWT_SECRET);

      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get fixer appointments for fixer panel
const appointmentsFixer = async (req, res) => {
  try {
    const { fixId } = req.body;

    const appointments = await appointmentModel.find({ fixId });

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to mark appointment completed for professional (fixer) panel

const appointmentComplete = async () => {
  try {
    const { fixId, appointmentId } = req.body;

    const appointmentData = appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.fixId === fixId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res.json({
        success: true,
        message: "The appointment is completed",
      });
    } else {
      return res.json({ success: false, message: "Failed to mark" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to cancel appointment for professional (fixer) panel

const appointmentCancel = async () => {
  try {
    const { fixId, appointmentId } = req.body;

    const appointmentData = appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.fixId === fixId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res.json({
        success: true,
        message: "The appointment is completed",
      });
    } else {
      return res.json({ success: false, message: "Failed cancellation" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  changeAvailability,
  professionalList,
  loginFixer,
  appointmentsFixer,
  appointmentComplete,
  appointmentCancel,
};
