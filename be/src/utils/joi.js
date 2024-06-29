import Joi from "joi";
import ExpressValidation from "express-joi-validation";

const validator = ExpressValidation.createValidator();
const joi = Joi.optional().allow("");

export const registerSchema = Joi.object({
  _id: joi,
  __v: Joi.number().optional().allow(""),
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
  employmentDate: joi,
  email: joi,
  SSS: joi,
  PagIbig: joi,
  PhilHealth: joi,
  TIN: joi,
  contactPersonNameInEmergency: joi,
  contactPersonNumberInEmergency: joi,
  image: joi,
});

export const testSchema = Joi.object({
  image: joi,
  name: joi,
});

export function joiValidator() {
  return validator.body(registerSchema);
}
