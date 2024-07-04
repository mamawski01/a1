import express from "express";

import { upload } from "../utils/multer.js";
import {
  apiUserDeleteUser,
  apiUserPatchUser,
  apiUserPostUser,
  apiUsers,
  apiUser,
} from "./controller/userRegister.js";
import {
  apiConfirmUser,
  apiConfirmUserDelete,
  apiConfirmUserPatchUser,
  apiConfirmUserPost,
  apiConfirmUsers,
} from "./controller/confirmUser.js";
import { joiValidator, registerSchema } from "../utils/joi.js";
import { apiAttendances, apiAttendancesPost } from "./controller/attendance.js";

const router = express.Router();

router.get("/apiUsers", apiUsers);

router.get("/apiUser/:id", apiUser);

router.post(
  "/apiUserPostUser",
  upload.single("image"),
  joiValidator(registerSchema),
  apiUserPostUser
);

router.patch(
  "/apiUserPatchUser/:id",
  upload.single("image"),
  joiValidator(registerSchema),
  apiUserPatchUser
);

router.delete("/apiUserDeleteUser/:id", apiUserDeleteUser);

//confirm user routes

router.get("/apiConfirmUsers", apiConfirmUsers);

router.get("/apiConfirmUser/:id", apiConfirmUser);

router.post(
  "/apiConfirmUserPost",
  joiValidator(registerSchema),
  apiConfirmUserPost
);

router.patch(
  "/apiConfirmUserPatchUser/:id",
  upload.single("image"),
  joiValidator(registerSchema),
  apiConfirmUserPatchUser
);

router.delete("/apiConfirmUserDelete/:id", apiConfirmUserDelete);

//attendance routes
router.get("/apiAttendances", apiAttendances);

router.post("/apiAttendancesPost", apiAttendancesPost);

export default router;
