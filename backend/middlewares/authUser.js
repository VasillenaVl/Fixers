import jwt from "jsonwebtoken";

// user authentication middleware
const authUser = async (req, res, next) => {
  // next е функция, която казва на Express да продължи със следващия middleware
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET); // декодира и проверява токена със секретния ключ

    req.body.userId = token_decode.id;

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;

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
