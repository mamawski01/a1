import multer from "multer";
import path from "path";
import fs from "fs";

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const location = "../n/uploads/images";

export const upload = multer({
  limits: 50000,
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, location);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("Invalid mime type!");
    cb(error, isValid);
  },
});

// Create the folder
// fs.mkdir("../n/uploads/images", (err) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log("Folder created");
// });
