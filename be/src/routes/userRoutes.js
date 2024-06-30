import express from "express";

import { upload } from "../utils/multer.js";
import {
  apiUserDeleteUser,
  apiUserPatchUser,
  apiUserPostUser,
  getUser,
  getUsers,
  apiPostTest,
} from "./controller/userRegister.js";
import {
  apiConfirmUserDelete,
  apiConfirmUserPatchUser,
  apiConfirmUserPost,
  getConfirmUser,
  getConfirmUsers,
} from "./controller/confirmUser.js";
import { joiValidator, registerSchema, testSchema } from "../utils/joi.js";

const router = express.Router();

router.get("/apiUsers", getUsers);

router.get("/apiUser/:id", getUser);

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

router.get("/apiConfirmUsers", getConfirmUsers);

router.get("/apiConfirmUser/:id", getConfirmUser);

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

//test routes

router.post(
  "/apiPostTest",
  upload.single("image"),
  joiValidator(testSchema),
  apiPostTest
);

router.patch(
  "/apiPatchTest/:id",
  upload.single("image"),
  joiValidator(testSchema),
  apiPostTest
);

export default router;
