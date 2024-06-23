import express from "express";
import Joi from "joi";
import ExpressValidation from "express-joi-validation";

import {
  apiUserDeleteUser,
  apiUserPatchUser,
  apiUserPostUser,
  getUser,
  getUsers,
  apiTest,
} from "./controller/userRegister.js";
import { upload } from "./multer.js";

const router = express.Router();
const validator = ExpressValidation.createValidator();

const joi = Joi.string().optional().allow("");

const registerSchema = Joi.object({
  firstName: joi,
  middleName: joi,
  lastName: joi,
  position: joi,
  street: joi,
  purok: joi,
  brgy: joi,
  city: joi,
  province: joi,
  country: joi,
  contactNumber1: joi,
  contactNumber2: joi,
  contactNumber3: joi,
  password: joi.required(),
  repeatPassword: joi.required().valid(Joi.ref("password")),
  birthdate: joi,
  email: joi,
  SSS: joi,
  PagIbig: joi,
  PhilHealth: joi,
  TIN: joi,
  contactPersonNameInEmergency: joi,
  contactPersonNumberInEmergency: joi,
  image: joi,
});

router.get("/apiUsers", getUsers);

router.get("/apiUser/:userId", getUser);

router.post(
  "/apiUserPostUser",
  upload.single("image"),
  validator.body(registerSchema),
  apiUserPostUser
);

router.patch("/apiUserPatchUser/:userId", apiUserPatchUser);

router.delete("/apiUserDeleteUser/:userId", apiUserDeleteUser);

const testSchema = Joi.object({
  image: joi,
  name: joi,
});

router.post(
  "/apiTest",
  upload.single("image"),
  validator.body(testSchema),
  apiTest
);

export default router;
