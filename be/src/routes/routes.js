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
  apiAttendanceSettings,
} from "./controller/attendanceSetting.js";
import {
  apiScheduleChildren,
  apiScheduleParent,
  apiSchedules,
  apiSchedulesChildrenPatch,
  apiSchedulesPostPatch,
} from "./controller/schedule.js";

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

router.delete("/apiConfirmUserDelete/:id/:id2nd", apiConfirmUserDelete);

//attendance routes
router.get("/apiAttendances", apiAttendances);

router.post("/apiAttendancesPost", apiAttendancesPost);

//attendanceId routes
router.get("/apiConfirmUserPatchUser/:id", apiAttendanceId);

router.patch("/apiAttendanceIdPatch/:id", apiAttendanceIdPatch);

//attendance routes settings
router.get("/apiAttendanceSettings", apiAttendanceSettings);

router.get("/apiAttendanceSetting/:id", apiAttendanceSetting);

router.post("/apiAttendanceSettingPost", apiAttendanceSettingPost);

router.patch("/apiAttendanceSettingPatch/:id", apiAttendanceSettingPatch);

//schedule routes
router.get("/apiSchedules", apiSchedules);

router.get("/apiScheduleParent/:id", apiScheduleParent);

router.get("/apiScheduleChildren/:id/:id2nd", apiScheduleChildren);

router.patch("/apiSchedulesPostPatch/:id", apiSchedulesPostPatch); //special ni kier

router.patch(
  "/apiSchedulesChildrenPatch/:id/:id2nd",
  apiSchedulesChildrenPatch
);

export default router;
