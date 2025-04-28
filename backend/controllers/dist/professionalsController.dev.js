"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appointmentCancel = exports.appointmentComplete = exports.appointmentsFixer = exports.loginFixer = exports.professionalList = exports.changeAvailability = void 0;

var _professionalsModel = _interopRequireDefault(require("../models/professionalsModel.js"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _appointmentModel = _interopRequireDefault(require("../models/appointmentModel.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var changeAvailability = function changeAvailability(req, res) {
  var fixId, fixData;
  return regeneratorRuntime.async(function changeAvailability$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          fixId = req.body.fixId;
          _context.next = 4;
          return regeneratorRuntime.awrap(_professionalsModel["default"].findById(fixId));

        case 4:
          fixData = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(_professionalsModel["default"].findByIdAndUpdate(fixId, {
            available: !fixData.available
          }));

        case 7:
          res.json({
            success: true,
            message: "Availability Changed"
          });
          _context.next = 14;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.json({
            success: false,
            message: _context.t0.message
          });

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

exports.changeAvailability = changeAvailability;

var professionalList = function professionalList(req, res) {
  var professionals;
  return regeneratorRuntime.async(function professionalList$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_professionalsModel["default"].find({}).select(["-password", "-email"]));

        case 3:
          professionals = _context2.sent;
          res.json({
            success: true,
            professionals: professionals
          });
          _context2.next = 11;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.json({
            success: false,
            message: _context2.t0.message
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // API for fixer Login


exports.professionalList = professionalList;

var loginFixer = function loginFixer(req, res) {
  var _req$body, email, password, fixer, isMatch, token;

  return regeneratorRuntime.async(function loginFixer$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context3.next = 4;
          return regeneratorRuntime.awrap(_professionalsModel["default"].findOne({
            email: email
          }));

        case 4:
          fixer = _context3.sent;

          if (fixer) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", res.json({
            success: false,
            message: "Non existing fixer"
          }));

        case 7:
          _context3.next = 9;
          return regeneratorRuntime.awrap(_bcrypt["default"].compare(password, fixer.password));

        case 9:
          isMatch = _context3.sent;

          if (isMatch) {
            token = _jsonwebtoken["default"].sign({
              id: fixer._id
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

          _context3.next = 17;
          break;

        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          res.json({
            success: false,
            message: _context3.t0.message
          });

        case 17:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 13]]);
}; // API to get fixer appointments for fixer panel


exports.loginFixer = loginFixer;

var appointmentsFixer = function appointmentsFixer(req, res) {
  var fixId, appointments;
  return regeneratorRuntime.async(function appointmentsFixer$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          fixId = req.body.fixId;
          _context4.next = 4;
          return regeneratorRuntime.awrap(_appointmentModel["default"].find({
            fixId: fixId
          }));

        case 4:
          appointments = _context4.sent;
          res.json({
            success: true,
            appointments: appointments
          });
          _context4.next = 12;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          res.json({
            success: false,
            message: _context4.t0.message
          });

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 8]]);
}; // API to mark appointment completed for professional (fixer) panel


exports.appointmentsFixer = appointmentsFixer;

var appointmentComplete = function appointmentComplete() {
  var _req$body2, fixId, appointmentId, appointmentData;

  return regeneratorRuntime.async(function appointmentComplete$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _req$body2 = req.body, fixId = _req$body2.fixId, appointmentId = _req$body2.appointmentId;
          appointmentData = _appointmentModel["default"].findById(appointmentId);

          if (!(appointmentData && appointmentData.fixId === fixId)) {
            _context5.next = 9;
            break;
          }

          _context5.next = 6;
          return regeneratorRuntime.awrap(_appointmentModel["default"].findByIdAndUpdate(appointmentId, {
            isCompleted: true
          }));

        case 6:
          return _context5.abrupt("return", res.json({
            success: true,
            message: "The appointment is completed"
          }));

        case 9:
          return _context5.abrupt("return", res.json({
            success: false,
            message: "Failed to mark"
          }));

        case 10:
          _context5.next = 16;
          break;

        case 12:
          _context5.prev = 12;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
          res.json({
            success: false,
            message: _context5.t0.message
          });

        case 16:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 12]]);
}; // API to cancel appointment for professional (fixer) panel


exports.appointmentComplete = appointmentComplete;

var appointmentCancel = function appointmentCancel() {
  var _req$body3, fixId, appointmentId, appointmentData;

  return regeneratorRuntime.async(function appointmentCancel$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _req$body3 = req.body, fixId = _req$body3.fixId, appointmentId = _req$body3.appointmentId;
          appointmentData = _appointmentModel["default"].findById(appointmentId);

          if (!(appointmentData && appointmentData.fixId === fixId)) {
            _context6.next = 9;
            break;
          }

          _context6.next = 6;
          return regeneratorRuntime.awrap(_appointmentModel["default"].findByIdAndUpdate(appointmentId, {
            cancelled: true
          }));

        case 6:
          return _context6.abrupt("return", res.json({
            success: true,
            message: "The appointment is completed"
          }));

        case 9:
          return _context6.abrupt("return", res.json({
            success: false,
            message: "Failed cancellation"
          }));

        case 10:
          _context6.next = 16;
          break;

        case 12:
          _context6.prev = 12;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);
          res.json({
            success: false,
            message: _context6.t0.message
          });

        case 16:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

exports.appointmentCancel = appointmentCancel;