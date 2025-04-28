"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _adminController = require("../controllers/adminController.js");

var _multer = _interopRequireDefault(require("../middlewares/multer.js"));

var _authAdmin = _interopRequireDefault(require("../middlewares/authAdmin.js"));

var _professionalsController = require("../controllers/professionalsController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var adminRouter = _express["default"].Router(); // post метод за създаване на endpoint


adminRouter.post("/add-professional", // route for adding a fixer ( used in AddFixer )
_authAdmin["default"], _multer["default"].single("image"), _adminController.addProfessional);
adminRouter.post("/login", _adminController.loginAdmin);
adminRouter.post("/all-fixers", _authAdmin["default"], _adminController.allFixers);
adminRouter.post("/change-availability", _authAdmin["default"], _professionalsController.changeAvailability);
adminRouter.get("/appointments", _authAdmin["default"], _adminController.appointmentsAdmin);
adminRouter.post("/cancel-appointment", _authAdmin["default"], _adminController.appointmentCancel);
adminRouter.get("/dashboard", _authAdmin["default"], _adminController.adminDashboard);
var _default = adminRouter;
exports["default"] = _default;