import { Joi, celebrate, Segments } from "celebrate";
import { customerCreateSchema } from "./customerValidator.js";

const role = ["President", "Manager", "Leader", "Staff"];

const employeePostValidation = celebrate({
  [Segments.BODY]: Joi.object({
    employeeNumber: Joi.number().positive().optional(),
    lastName: Joi.string().min(3).max(50).required(),
    firstName: Joi.string().min(3).max(50).required(),
    extension: Joi.string().max(50).required(),
    email: Joi.string().email().min(10).max(100).required(),
    officeCode: Joi.string().max(10).required(),
    reportsTo: Joi.number().positive().allow(null).optional(),
    jobTitle: Joi.string()
      .valid(...role)
      .required(),
    customers: Joi.array().items(customerCreateSchema).optional(),
  }).options({ abortEarly: false }),
});

const employeePutValidation = celebrate({
  [Segments.BODY]: Joi.object({
    employeeNumber: Joi.number().positive().forbidden().messages({
      "any.unknown": "employeeNumber should not be changed",
    }),
    lastName: Joi.string().min(3).max(50).forbidden().messages({
      "any.unknown": "lastName should not be changed",
    }),
    firstName: Joi.string().min(3).max(50).required(),
    extension: Joi.string().max(50).required(),
    email: Joi.string().email().min(10).max(100).required(),
    officeCode: Joi.string().max(10).required(),
    reportsTo: Joi.number().positive().allow(null).optional(),
    jobTitle: Joi.string()
      .valid(...role)
      .required(),
  }).options({ abortEarly: false }),
});

export { employeePostValidation, employeePutValidation };
