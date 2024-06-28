import fs from "fs";

export function deleteImage(path) {
  return fs.unlink(path, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("File deleted successfully.");
    }
  });
}
