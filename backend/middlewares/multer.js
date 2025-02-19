import multer from "multer";

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

// const upload = multer({ storage });

// export default upload;

// import multer from "multer";
// import path from "path";

// // конфигураация на multer
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname)); // Уникално име за файла
//   },
// });

const upload = multer({ storage });
export default upload;
