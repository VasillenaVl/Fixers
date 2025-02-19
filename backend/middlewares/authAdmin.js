import jwt from "jsonwebtoken";

// admin authentication middleware
const authAdmin = async (req, res, next) => {
  // next е функция, която казва на Express да продължи със следващия middleware
  try {
    const { atoken } = req.headers;
    if (!atoken) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }
    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET); // декодира и проверява токена със секретния ключ

    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      // проверява дали декодирания токен съвпада с имейла и паролата
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authAdmin;

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
