import Joi from "joi";
import ExpressValidation from "express-joi-validation";

const validator = ExpressValidation.createValidator();
const joi = Joi.optional().allow("");

export function joiValidator(schema) {
  return validator.body(schema);
}

const userSchema = {
  _id: joi,
  __v: Joi.number().optional().allow(""),
  firstName: joi,
  middleName: joi,
  lastName: joi,
  position: joi,
  status: joi,
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
  wage: joi,
  email: joi,
  SSS: joi,
  PagIbig: joi,
  PhilHealth: joi,
  TIN: joi,
  contactPersonNameInEmergency: joi,
  contactPersonNumberInEmergency: joi,
  image: joi,
};

export const registerSchema = Joi.object(userSchema);

export const confirmSchema = Joi.object({
  ...userSchema,
  attendanceId: joi,
});
