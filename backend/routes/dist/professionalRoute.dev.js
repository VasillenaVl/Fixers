"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _professionalsController = require("../controllers/professionalsController.js");

var _authFixer = _interopRequireDefault(require("../middlewares/authFixer.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var professionalRouter = _express["default"].Router();

professionalRouter.get("/list", _professionalsController.professionalList);
professionalRouter.post("/login", _professionalsController.loginFixer);
professionalRouter.get("/appointments", _authFixer["default"], _professionalsController.appointmentsFixer);
professionalRouter.post("/complete-appointment", _authFixer["default"], _professionalsController.appointmentComplete);
professionalRouter.post("/cancel-appointment", _authFixer["default"], _professionalsController.appointmentCancel);
var _default = professionalRouter;
exports["default"] = _default;