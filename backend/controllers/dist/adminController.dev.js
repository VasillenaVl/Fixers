"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adminDashboard = exports.appointmentCancel = exports.appointmentsAdmin = exports.allFixers = exports.loginAdmin = exports.addProfessional = void 0;

var _validator = _interopRequireDefault(require("validator"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _cloudinary = require("cloudinary");

var _professionalsModel = _interopRequireDefault(require("../models/professionalsModel.js"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _appointmentModel = _interopRequireDefault(require("../models/appointmentModel.js"));

var _userModel = _interopRequireDefault(require("../models/userModel.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// API за добавяне на  работници
var addProfessional = function addProfessional(req, res) {
  var _req$body, name, email, password, speciality, experience, about, fees, address, imageFile, salt, hashedPassword, imageUpload, imageUrl, professionalData, newProfessional;

  return regeneratorRuntime.async(function addProfessional$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          //ако файлът не бъде изпратен правилно, ще върне undefined или null за req.file
          console.log("Received req.body:", req.body);
          console.log("Received req.file:", req.file);
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, speciality = _req$body.speciality, experience = _req$body.experience, about = _req$body.about, fees = _req$body.fees, address = _req$body.address;
          imageFile = req.file; // checking if the image is available

          if (imageFile) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.json({
            success: false,
            message: "Image is required"
          }));

        case 7:
          if (!(!name || !email || !password || !speciality || !experience || !about || !fees || !address)) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", res.json({
            success: false,
            message: "Missing Details"
          }));

        case 9:
          if (_validator["default"].isEmail(email)) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", res.json({
            success: false,
            message: "Please enter a valid email"
          }));

        case 11:
          if (!(password.length < 8)) {
            _context.next = 13;
            break;
          }

          return _context.abrupt("return", res.json({
            success: false,
            message: "Please enter a strong password"
          }));

        case 13:
          _context.next = 15;
          return regeneratorRuntime.awrap(_bcrypt["default"].genSalt(10));

        case 15:
          salt = _context.sent;
          _context.next = 18;
          return regeneratorRuntime.awrap(_bcrypt["default"].hash(password, salt));

        case 18:
          hashedPassword = _context.sent;
          _context.next = 21;
          return regeneratorRuntime.awrap(_cloudinary.v2.uploader.upload(imageFile.path, {
            resource_type: "image"
          }));

        case 21:
          imageUpload = _context.sent;
          imageUrl = imageUpload.secure_url;
          professionalData = {
            name: name,
            email: email,
            image: imageUrl,
            password: hashedPassword,
            speciality: speciality,
            experience: experience,
            about: about,
            fees: fees,
            address: JSON.parse(address),
            date: Date.now()
          };
          console.log("Professional data before saving:", professionalData.date); // checking if its working

          newProfessional = new _professionalsModel["default"](professionalData);
          _context.next = 28;
          return regeneratorRuntime.awrap(newProfessional.save());

        case 28:
          res.json({
            success: true,
            message: "New Fixer Added"
          }); // console.log(
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

          _context.next = 35;
          break;

        case 31:
          _context.prev = 31;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.json({
            success: false,
            message: _context.t0.message
          });

        case 35:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 31]]);
}; // API For admin login


exports.addProfessional = addProfessional;

var loginAdmin = function loginAdmin(req, res) {
  var _req$body2, email, password, token;

  return regeneratorRuntime.async(function loginAdmin$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          try {
            _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;

            if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
              token = _jsonwebtoken["default"].sign(email + password, process.env.JWT_SECRET);
              res.json({
                success: true,
                token: token
              });
            } else {
              res.json({
                success: false,
                message: "Invalid credentials"
              });
            }
          } catch (error) {
            console.log(error);
            res.json({
              success: false,
              message: error.message
            });
          }

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
}; // API to get all fixers list for admin panel


exports.loginAdmin = loginAdmin;

var allFixers = function allFixers(req, res) {
  var fixers;
  return regeneratorRuntime.async(function allFixers$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_professionalsModel["default"].find({}).select("-password"));

        case 3:
          fixers = _context3.sent;
          res.json({
            success: true,
            fixers: fixers
          });
          _context3.next = 11;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          res.json({
            success: false,
            message: _context3.t0.message
          });

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // API to get all appointments list


exports.allFixers = allFixers;

var appointmentsAdmin = function appointmentsAdmin(req, res) {
  var appointments;
  return regeneratorRuntime.async(function appointmentsAdmin$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_appointmentModel["default"].find({}));

        case 3:
          appointments = _context4.sent;
          res.json({
            success: true,
            appointments: appointments
          });
          _context4.next = 11;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          res.json({
            success: false,
            message: _context4.t0.message
          });

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // API to cancel appointments


exports.appointmentsAdmin = appointmentsAdmin;

var appointmentCancel = function appointmentCancel(req, res) {
  var appointmentId, appointmentData, fixId, slotDate, slotTime, fixData, slots_booked;
  return regeneratorRuntime.async(function appointmentCancel$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          appointmentId = req.body.appointmentId;
          _context5.next = 4;
          return regeneratorRuntime.awrap(_appointmentModel["default"].findById(appointmentId));

        case 4:
          appointmentData = _context5.sent;
          _context5.next = 7;
          return regeneratorRuntime.awrap(_appointmentModel["default"].findByIdAndUpdate(appointmentId, {
            cancelled: true
          }));

        case 7:
          // releasing fixers slot
          fixId = appointmentData.fixId, slotDate = appointmentData.slotDate, slotTime = appointmentData.slotTime;
          _context5.next = 10;
          return regeneratorRuntime.awrap(_professionalsModel["default"].findById(fixId));

        case 10:
          fixData = _context5.sent;
          slots_booked = fixData.slots_booked;
          slots_booked[slotDate] = slots_booked[slotDate].filter(function (e) {
            return e !== slotTime;
          });
          _context5.next = 15;
          return regeneratorRuntime.awrap(_professionalsModel["default"].findByIdAndUpdate(fixId, {
            slots_booked: slots_booked
          }));

        case 15:
          res.json({
            success: true,
            message: " The appointment is cancelled"
          });
          _context5.next = 22;
          break;

        case 18:
          _context5.prev = 18;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
          res.json({
            success: false,
            message: _context5.t0.message
          });

        case 22:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 18]]);
}; // API to get dashboard data for admin panel


exports.appointmentCancel = appointmentCancel;

var adminDashboard = function adminDashboard(req, res) {
  var fixers, users, appointments, dashData;
  return regeneratorRuntime.async(function adminDashboard$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(_professionalsModel["default"].find({}));

        case 3:
          fixers = _context6.sent;
          _context6.next = 6;
          return regeneratorRuntime.awrap(_userModel["default"].find({}));

        case 6:
          users = _context6.sent;
          _context6.next = 9;
          return regeneratorRuntime.awrap(_appointmentModel["default"].find({}));

        case 9:
          appointments = _context6.sent;
          dashData = {
            fixers: fixers.length,
            appointments: appointments.length,
            clients: users.length,
            newestAppointments: _toConsumableArray(appointments).reverse().slice(0, 5) // [...appointments] - creates a shallow copy of the array before reversing to prevent bugs
            // reverse () -  the last item becomes first
            // slice(0,5) - takes a copy of the first 5 elements in the now-reversed array ( so we get the newest 5 elements)

          };
          res.json({
            success: true,
            dashData: dashData
          });
          _context6.next = 18;
          break;

        case 14:
          _context6.prev = 14;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);
          res.json({
            success: false,
            message: _context6.t0.message
          });

        case 18:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

exports.adminDashboard = adminDashboard;