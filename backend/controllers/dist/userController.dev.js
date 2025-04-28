"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cancelAppointment = exports.listAppointment = exports.bookAppointment = exports.updateProfile = exports.getProfile = exports.loginUser = exports.registerUser = void 0;

var _validator = _interopRequireDefault(require("validator"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _userModel = _interopRequireDefault(require("../models/userModel.js"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _cloudinary = require("cloudinary");

var _professionalsModel = _interopRequireDefault(require("../models/professionalsModel.js"));

var _appointmentModel = _interopRequireDefault(require("../models/appointmentModel.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// API to register user
var registerUser = function registerUser(req, res) {
  var _req$body, name, email, password, salt, hashedPassword, userData, newUser, user, token;

  return regeneratorRuntime.async(function registerUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;

          if (!(!name || !password || !email)) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.json({
            success: false,
            message: "Missing Details"
          }));

        case 4:
          if (_validator["default"].isEmail(email)) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.json({
            success: false,
            message: "Enter A Valid Email"
          }));

        case 6:
          if (!(password.length < 8)) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", res.json({
            success: false,
            message: "Enter A Stronger Password"
          }));

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(_bcrypt["default"].genSalt(10));

        case 10:
          salt = _context.sent;
          _context.next = 13;
          return regeneratorRuntime.awrap(_bcrypt["default"].hash(password, salt));

        case 13:
          hashedPassword = _context.sent;
          userData = {
            name: name,
            email: email,
            password: hashedPassword
          };
          newUser = new _userModel["default"](userData);
          _context.next = 18;
          return regeneratorRuntime.awrap(newUser.save());

        case 18:
          user = _context.sent;
          // saving the new user in the db
          token = _jsonwebtoken["default"].sign({
            id: user._id
          }, process.env.JWT_SECRET);
          res.json({
            success: true,
            token: token
          });
          _context.next = 27;
          break;

        case 23:
          _context.prev = 23;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.json({
            success: false,
            message: _context.t0.message
          });

        case 27:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 23]]);
}; // API for user login


exports.registerUser = registerUser;

var loginUser = function loginUser(req, res) {
  var _req$body2, email, password, user, isMatch, token, userData;

  return regeneratorRuntime.async(function loginUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_userModel["default"].findOne({
            email: email
          }));

        case 4:
          user = _context2.sent;

          if (user) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.json({
            success: false,
            message: "User Does Not Exist"
          }));

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(_bcrypt["default"].compare(password, user.password));

        case 9:
          isMatch = _context2.sent;

          if (isMatch) {
            token = _jsonwebtoken["default"].sign({
              id: user._id
            }, process.env.JWT_SECRET);
            res.json({
              success: true,
              token: token
            });
          } else {
            res.json({
              success: false,
              message: "Invalid Credentials"
            });
          }

          _context2.next = 21;
          break;

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.json({
            success: false,
            message: _context2.t0.message
          });
          _context2.next = 19;
          return regeneratorRuntime.awrap(_userModel["default"].findById(userId).select("-password"));

        case 19:
          userData = _context2.sent;
          res.json({
            success: true,
            userData: userData
          });

        case 21:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 13]]);
}; // API to get user profile data


exports.loginUser = loginUser;

var getProfile = function getProfile(req, res) {
  var _userId, userData;

  return regeneratorRuntime.async(function getProfile$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _userId = req.body.userId;
          _context3.next = 4;
          return regeneratorRuntime.awrap(_userModel["default"].findById(_userId).select("-password"));

        case 4:
          userData = _context3.sent;
          res.json({
            success: true,
            userData: userData
          });
          _context3.next = 12;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          res.json({
            success: false,
            message: _context3.t0.message
          });

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
}; // API to update user profile


exports.getProfile = getProfile;

var updateProfile = function updateProfile(req, res) {
  var _req$body3, _userId2, name, phone, address, dob, gender, imageFile, imageUpload, imageUrl;

  return regeneratorRuntime.async(function updateProfile$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$body3 = req.body, _userId2 = _req$body3.userId, name = _req$body3.name, phone = _req$body3.phone, address = _req$body3.address, dob = _req$body3.dob, gender = _req$body3.gender;
          imageFile = req.imageFile;

          if (!(!name || !phone || !dob || !gender)) {
            _context4.next = 5;
            break;
          }

          return _context4.abrupt("return", res.json({
            success: false,
            message: "Data Missing"
          }));

        case 5:
          _context4.next = 7;
          return regeneratorRuntime.awrap(_userModel["default"].findByIdAndUpdate(_userId2, {
            name: name,
            phone: phone,
            address: JSON.parse(address),
            dob: dob,
            gender: gender
          }));

        case 7:
          if (!imageFile) {
            _context4.next = 14;
            break;
          }

          _context4.next = 10;
          return regeneratorRuntime.awrap(_cloudinary.v2.uploader.upload(imageFile.path, {
            resourse_type: "image"
          }));

        case 10:
          imageUpload = _context4.sent;
          imageUrl = imageUpload.secure_url;
          _context4.next = 14;
          return regeneratorRuntime.awrap(_userModel["default"].findByIdAndUpdate(_userId2, {
            image: imageUrl
          }));

        case 14:
          res.json({
            success: true,
            message: "Profile Updated"
          });
          _context4.next = 21;
          break;

        case 17:
          _context4.prev = 17;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          res.json({
            success: false,
            message: _context4.t0.message
          });

        case 21:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 17]]);
}; // API to book appointment


exports.updateProfile = updateProfile;

var bookAppointment = function bookAppointment(req, res) {
  var _req$body4, _userId3, fixId, slotDate, slotTime, fixData, slots_booked, userData, appointmentData, newAppointment;

  return regeneratorRuntime.async(function bookAppointment$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _req$body4 = req.body, _userId3 = _req$body4.userId, fixId = _req$body4.fixId, slotDate = _req$body4.slotDate, slotTime = _req$body4.slotTime;
          console.log("🔵 Request received:", {
            userId: _userId3,
            fixId: fixId,
            slotDate: slotDate,
            slotTime: slotTime
          });
          _context5.next = 5;
          return regeneratorRuntime.awrap(_professionalsModel["default"].findByIdAndUpdate(fixId, {
            available: true
          }));

        case 5:
          _context5.next = 7;
          return regeneratorRuntime.awrap(_professionalsModel["default"].findById(fixId).select("-password"));

        case 7:
          fixData = _context5.sent;
          console.log("🔵 Fixer data:", fixData);
          console.log("fixData.available:", fixData.available);

          if (fixData.available) {
            _context5.next = 12;
            break;
          }

          return _context5.abrupt("return", res.json({
            success: false,
            message: "The fixer is not available"
          }));

        case 12:
          slots_booked = fixData.slots_booked; // checking for slot availability

          if (!slots_booked[slotDate]) {
            _context5.next = 21;
            break;
          }

          if (!slots_booked[slotDate].includes(slotTime)) {
            _context5.next = 18;
            break;
          }

          return _context5.abrupt("return", res.json({
            success: false,
            message: "Slot not available"
          }));

        case 18:
          slots_booked[slotDate].push(slotTime);

        case 19:
          _context5.next = 23;
          break;

        case 21:
          slots_booked[slotDate] = [];
          slots_booked[slotDate].push(slotTime);

        case 23:
          console.log("🟢 Slots booked updated:", slots_booked);
          _context5.next = 26;
          return regeneratorRuntime.awrap(_userModel["default"].findById(_userId3).select("-password"));

        case 26:
          userData = _context5.sent;
          console.log("🔵 User data:", userData);
          delete fixData.slots_booked;
          appointmentData = {
            userId: _userId3,
            fixId: fixId,
            userData: userData,
            fixData: fixData,
            amount: fixData.fees,
            slotTime: slotTime,
            slotDate: slotDate,
            date: Date.now()
          };
          console.log("🟢 Appointment data before saving:", appointmentData);
          newAppointment = new _appointmentModel["default"](appointmentData);
          _context5.next = 34;
          return regeneratorRuntime.awrap(newAppointment.save());

        case 34:
          console.log("✅ Appointment successfully saved!"); // save new slots data in fixData

          _context5.next = 37;
          return regeneratorRuntime.awrap(_professionalsModel["default"].findByIdAndUpdate(fixId, {
            slots_booked: slots_booked
          }));

        case 37:
          res.json({
            success: true,
            message: "You have booked an appointment"
          });
          _context5.next = 44;
          break;

        case 40:
          _context5.prev = 40;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
          res.json({
            success: false,
            message: _context5.t0.message
          });

        case 44:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 40]]);
}; // API to get user appointments for frontend appointments page


exports.bookAppointment = bookAppointment;

var listAppointment = function listAppointment(req, res) {
  var _userId4, appointments;

  return regeneratorRuntime.async(function listAppointment$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _userId4 = req.body.userId;
          _context6.next = 4;
          return regeneratorRuntime.awrap(_appointmentModel["default"].find({
            userId: _userId4
          }));

        case 4:
          appointments = _context6.sent;
          res.json({
            success: true,
            appointments: appointments
          });
          _context6.next = 12;
          break;

        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);
          res.json({
            success: false,
            message: _context6.t0.message
          });

        case 12:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 8]]);
}; // API to cancel appointments


exports.listAppointment = listAppointment;

var cancelAppointment = function cancelAppointment(req, res) {
  var _req$body5, _userId5, appointmentId, appointmentData, fixId, slotDate, slotTime, fixData, slots_booked;

  return regeneratorRuntime.async(function cancelAppointment$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _req$body5 = req.body, _userId5 = _req$body5.userId, appointmentId = _req$body5.appointmentId;
          _context7.next = 4;
          return regeneratorRuntime.awrap(_appointmentModel["default"].findById(appointmentId));

        case 4:
          appointmentData = _context7.sent;
          console.log("cancelled"); // verify  appointment user

          if (!(appointmentData.userId !== _userId5)) {
            _context7.next = 8;
            break;
          }

          return _context7.abrupt("return", res.json({
            success: false,
            message: "Unauthorized action"
          }));

        case 8:
          _context7.next = 10;
          return regeneratorRuntime.awrap(_appointmentModel["default"].findByIdAndUpdate(appointmentId, {
            cancelled: true
          }));

        case 10:
          // releasing fixers slot
          fixId = appointmentData.fixId, slotDate = appointmentData.slotDate, slotTime = appointmentData.slotTime;
          _context7.next = 13;
          return regeneratorRuntime.awrap(_professionalsModel["default"].findById(fixId));

        case 13:
          fixData = _context7.sent;
          slots_booked = fixData.slots_booked;
          slots_booked[slotDate] = slots_booked[slotDate].filter(function (e) {
            return e !== slotTime;
          });
          _context7.next = 18;
          return regeneratorRuntime.awrap(_professionalsModel["default"].findByIdAndUpdate(fixId, {
            slots_booked: slots_booked
          }));

        case 18:
          res.json({
            success: true,
            message: " The appointment is cancelled"
          });
          _context7.next = 25;
          break;

        case 21:
          _context7.prev = 21;
          _context7.t0 = _context7["catch"](0);
          console.log(_context7.t0);
          res.json({
            success: false,
            message: _context7.t0.message
          });

        case 25:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 21]]);
};

exports.cancelAppointment = cancelAppointment;