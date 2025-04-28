"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = require("../controllers/userController.js");

var _authUser = _interopRequireDefault(require("../middlewares/authUser.js"));

var _multer = _interopRequireDefault(require("../middlewares/multer.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userRouter = _express["default"].Router();

userRouter.post("/register", _userController.registerUser);
userRouter.post("/login", _userController.loginUser);
userRouter.get("/get-profile", _authUser["default"], _userController.getProfile);
userRouter.post("/update-profile", _multer["default"].single("image"), _authUser["default"], _userController.updateProfile);
userRouter.post("/book-appointment", _authUser["default"], _userController.bookAppointment);
userRouter.get("/appointments", _authUser["default"], _userController.listAppointment);
userRouter.post("/cancel-appointment", _authUser["default"], _userController.cancelAppointment);
userRouter.post("/payment-stripe", _authUser["default"], _userController.paymentStripe);
var _default = userRouter;
exports["default"] = _default;