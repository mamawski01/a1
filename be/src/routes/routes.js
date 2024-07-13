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
import { confirmSchema, joiValidator, registerSchema } from "../utils/joi.js";
import { apiAttendances, apiAttendancesPost } from "./controller/attendance.js";
import {
  apiAttendanceId,
  apiAttendanceIdPatch,
} from "./controller/attendanceId.js";
import {
  apiAttendanceSetting,
  apiAttendanceSettingPatch,
  apiAttendanceSettingPost,
} from "./controller/attendanceSetting.js";

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
  joiValidator(confirmSchema),
  apiConfirmUserPost
);

router.patch(
  "/apiConfirmUserPatchUser/:id",
  upload.single("image"),
  joiValidator(confirmSchema),
  apiConfirmUserPatchUser
);

router.delete("/apiConfirmUserDelete/:id", apiConfirmUserDelete);

//attendance routes
router.get("/apiAttendances", apiAttendances);

router.post("/apiAttendancesPost", apiAttendancesPost);

//attendanceId routes
router.get("/apiConfirmUserPatchUser/:id", apiAttendanceId);

router.patch("/apiAttendanceIdPatch/:id", apiAttendanceIdPatch);

//attendance routes settings
router.get("/apiAttendanceSetting/:id", apiAttendanceSetting);

router.post("/apiAttendanceSettingPost", apiAttendanceSettingPost);

router.patch("/apiAttendanceSettingPatch/:id", apiAttendanceSettingPatch);

export default router;
