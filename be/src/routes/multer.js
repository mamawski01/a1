import multer from "multer";
import path from "path";
import { v4 as uuid } from "uuid";
import fs from "fs";

const fileLocation = "../images";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, fileLocation);
  },
  filename: function (req, file, cb) {
    cb(null, fileLocation + "-" + uuid() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage: storage });

// Create the folder
fs.mkdir("../images", (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Folder created successfully");
});
