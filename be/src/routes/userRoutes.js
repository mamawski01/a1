import express from "express";
import Joi from "joi";
import ExpressValidation from "express-joi-validation";

import getUsers from "./controller/getUsers.js";
import postUserRegister from "./controller/postUserRegister.js";

const router = express.Router();
const validator = ExpressValidation.createValidator({});

const registerSchema = Joi.object({
  firstName: Joi.string().max(100).required().messages({
    "string.base": `"firstName" should be a type of 'text'`,
    "string.empty": `"firstName" cannot be an empty field`,
    "string.max": `"firstName" should have a maximum length of 100`,
    "any.required": `"firstName" is a required field`,
  }),
  middleName: Joi.string().max(100).required().messages({
    "string.base": `"middleName" should be a type of 'text'`,
    "string.empty": `"middleName" cannot be an empty field`,
    "string.max": `"middleName" should have a maximum length of 100`,
    "any.required": `"middleName" is a required field`,
  }),
  lastName: Joi.string().max(100).required().messages({
    "string.base": `"lastName" should be a type of 'text'`,
    "string.empty": `"lastName" cannot be an empty field`,
    "string.max": `"lastName" should have a maximum length of 100`,
    "any.required": `"lastName" is a required field`,
  }),
  position: Joi.string().max(100).required().messages({
    "string.base": `"position" should be a type of 'text'`,
    "string.empty": `"position" cannot be an empty field`,
    "string.max": `"position" should have a maximum length of 100`,
    "any.required": `"position" is a required field`,
  }),
  address: Joi.string().max(1000).required().messages({
    "string.base": `"address" should be a type of 'text'`,
    "string.empty": `"address" cannot be an empty field`,
    "string.max": `"address" should have a maximum length of 1000`,
    "any.required": `"address" is a required field`,
  }),
  cellphoneNumbers: Joi.array()
    .items(Joi.string().min(0))
    .min(1)
    .max(100)
    .required()
    .messages({
      "array.base": `"cellphoneNumbers" should be an array`,
      "array.min": `"cellphoneNumbers" should contain at least 1 number`,
      "array.max": `"cellphoneNumbers" should contain no more than 100 number`,
      "any.required": `"cellphoneNumbers" is a required field`,
    }),
  password: Joi.string()
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .messages({
      "string.base": `"password" should be a type of 'text'`,
      "string.empty": `"password" cannot be an empty field`,
      "string.pattern.base": `"password" must be at least 3 characters long and contain only alphanumeric characters`,
      "any.required": `"password" is a required field`,
    }),
  repeat_password: Joi.ref("password"),
  birthdate: Joi.date().min("1-1-1940").iso().required().messages({
    "date.base": `"birthdate" should be a valid date`,
    "date.min": `"birthdate" should be later than 1-1-1940`,
    "any.required": `"birthdate" is a required field`,
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.email": `"email" must be a valid email address`,
      "any.required": `"email" is a required field`,
    }),
  SSS: Joi.string().max(100).required().messages({
    "string.base": `"SSS" should be a type of 'text'`,
    "string.empty": `"SSS" cannot be an empty field`,
    "string.max": `"SSS" should have a maximum length of 100`,
    "any.required": `"SSS" is a required field`,
  }),
  Pag_Ibig: Joi.string().max(100).required().messages({
    "string.base": `"Pag_Ibig" should be a type of 'text'`,
    "string.empty": `"Pag_Ibig" cannot be an empty field`,
    "string.max": `"Pag_Ibig" should have a maximum length of 100`,
    "any.required": `"Pag_Ibig" is a required field`,
  }),
  PhilHealth: Joi.string().max(100).required().messages({
    "string.base": `"PhilHealth" should be a type of 'text'`,
    "string.empty": `"PhilHealth" cannot be an empty field`,
    "string.min": `"PhilHealth" should have a minimum length of 1`,
    "string.max": `"PhilHealth" should have a maximum length of 100`,
    "any.required": `"PhilHealth" is a required field`,
  }),
  TIN: Joi.string().max(100).required().messages({
    "string.base": `"TIN" should be a type of 'text'`,
    "string.empty": `"TIN" cannot be an empty field`,
    "string.max": `"TIN" should have a maximum length of 100`,
    "any.required": `"TIN" is a required field`,
  }),
  contactPersonNameInEmergency: Joi.string()

    .max(100)
    .required()
    .messages({
      "string.base": `"contactPersonNameInEmergency" should be a type of 'text'`,
      "string.empty": `"contactPersonNameInEmergency" cannot be an empty field`,
      "string.max": `"contactPersonNameInEmergency" should have a maximum length of 100`,
      "any.required": `"contactPersonNameInEmergency" is a required field`,
    }),
  contactPersonNumberInEmergency: Joi.string()

    .max(100)
    .required()
    .messages({
      "string.base": `"contactPersonNumberInEmergency" should be a type of 'text'`,
      "string.empty": `"contactPersonNumberInEmergency" cannot be an empty field`,
      "string.max": `"contactPersonNumberInEmergency" should have a maximum length of 100`,
      "any.required": `"contactPersonNumberInEmergency" is a required field`,
    }),
  oneTimePassword: Joi.string().required().messages({
    "string.base": `"oneTimePassword" should be a type of 'text'`,
    "string.empty": `"oneTimePassword" cannot be an empty field`,
    "any.required": `"oneTimePassword" is a required field `,
  }),
});

router.get("/users", getUsers);
router.post("/userRegister", validator.body(registerSchema), postUserRegister);

export default router;
