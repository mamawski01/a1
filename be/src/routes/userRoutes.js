import express from "express";
import Joi from "joi";
import ExpressValidation from "express-joi-validation";

import postUserRegister from "./controller/postUserRegister.js";
import deleteUser from "./controller/deleteUser.js";
import getUser from "./controller/getUser.js";
import getUsers from "./controller/getUsers.js";

const router = express.Router();
const validator = ExpressValidation.createValidator({});

const joi = Joi.string();

const registerSchema = Joi.object({
  firstName: joi.required(),
  middleName: joi.required(),
  lastName: joi.required(),
  position: joi.required(),
  street: joi.optional().allow(""),
  purok: joi.optional().allow(""),
  brgy: joi.required(),
  city: joi.required(),
  province: joi.required(),
  country: joi.required(),
  contactNumber1: joi.required(),
  contactNumber2: joi.optional().allow(""),
  contactNumber3: joi.optional().allow(""),
  birthdate: joi.required(),
  email: joi.email().required(),
  SSS: joi.optional().allow(""),
  PagIbig: joi.optional().allow(""),
  PhilHealth: joi.optional().allow(""),
  TIN: joi.optional().allow(""),
  contactPersonNameInEmergency: joi.required(),
  contactPersonNumberInEmergency: joi.required(),
  password: joi.required(),
  repeatPassword: joi.required().valid(Joi.ref("password")),
});

router.get("/api/users", getUsers);

router.get("/api/user/:userId", getUser);

router.post(
  "/api/registerUser",
  validator.body(registerSchema),
  postUserRegister
);

router.delete("/api/deleteUser/:userId", deleteUser);

export default router;
