"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// user authentication middleware
var authUser = function authUser(req, res, next) {
  var token, token_decode;
  return regeneratorRuntime.async(function authUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          token = req.headers.token;

          if (token) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.json({
            success: false,
            message: "Not Authorized Login Again"
          }));

        case 4:
          token_decode = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET); // декодира и проверява токена със секретния ключ

          req.body.userId = token_decode.id;
          next();
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.json({
            success: false,
            message: _context.t0.message
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

var _default = authUser;
/*
Кодът с Promise
const authAdmin = (req, res, next) => {
  const { atoken } = req.headers;
  if (!atoken) {
    return res.json({ success: false, message: "Not Authorized Login Again" });
  }

  // Преобразяваме jwt.verify() в Promise
  new Promise((resolve, reject) => {
    jwt.verify(atoken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) reject(err);
      else resolve(decoded);
    });
  })
    .then((token_decode) => {
      if (token_decode.email !== process.env.ADMIN_EMAIL) {
        throw new Error("Not Authorized Login Again");
      }
      next();
    })
    .catch((error) => {
      console.log(error);
      res.json({ success: false, message: error.message });
    });
};
*/

exports["default"] = _default;