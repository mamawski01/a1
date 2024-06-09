import express from "express";
import Joi from "joi";
import ExpressValidation from "express-joi-validation";

import getUsers from "./controller/getUsers.js";
import postUserRegister from "./controller/postUserRegister.js";

const router = express.Router();
const validator = ExpressValidation.createValidator({});

const registerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  address: Joi.string().required(),
  cellphoneNumbers: Joi.array().items(Joi.string().min(0)).min(1).required(),
  password: Joi.string().required(),
  repeat_password: Joi.ref("password"),
  birthdate: Joi.date().iso().required(),
  email: Joi.string().email().required(),
});

router.get("/api/users", getUsers);
router.post(
  "/api/userRegister",
  validator.body(registerSchema),
  postUserRegister
);

export default router;
