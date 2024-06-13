import express from "express";
import Joi from "joi";
import ExpressValidation from "express-joi-validation";

import getUsers from "./controller/getUsers.js";
import postUserRegister from "./controller/postUserRegister.js";

const router = express.Router();
const validator = ExpressValidation.createValidator({});

const registerSchema = Joi.object({
  firstName: Joi.string().required(),
  middleName: Joi.string().required(),
  lastName: Joi.string().required(),
  position: Joi.string().required(),
  street: Joi.string().optional().allow(""),
  purok: Joi.string().optional().allow(""),
  brgy: Joi.string().required(),
  city: Joi.string().required(),
  province: Joi.string().required(),
  country: Joi.string().required(),
  contactNumber1: Joi.string().required(),
  contactNumber2: Joi.string().optional().allow(""),
  contactNumber3: Joi.string().optional().allow(""),
  password: Joi.string().required(),
  repeatPassword: Joi.string().required().valid(Joi.ref("password")),
  birthdate: Joi.string().required(),
  email: Joi.string().email().required(),
  SSS: Joi.string().optional().allow(""),
  PagIbig: Joi.string().optional().allow(""),
  PhilHealth: Joi.string().optional().allow(""),
  TIN: Joi.string().optional().allow(""),
  contactPersonNameInEmergency: Joi.string().required(),
  contactPersonNumberInEmergency: Joi.string().required(),
});

router.get("/api/users", getUsers);

router.post(
  "/api/registerUser",
  validator.body(registerSchema),
  postUserRegister
);

export default router;
