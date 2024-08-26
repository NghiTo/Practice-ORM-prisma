import { Joi, celebrate, Segments } from "celebrate";

const customerPutValidation = celebrate({
  [Segments.BODY]: Joi.object({
    customerNumber: Joi.number().positive().forbidden().messages({
      "any.unknown": "customerNumber should not be changed",
    }),
    customerName: Joi.string().min(5).max(50).required(),
    contactLastName: Joi.string().min(3).max(50).required(),
    contactFirstName: Joi.string().min(3).max(50).required(),
    phone: Joi.string().min(8).max(20).required(),
    addressLine1: Joi.string().min(10).max(50).required(),
    addressLine2: Joi.string().min(10).max(50).allow(null).optional(),
    city: Joi.string().min(2).max(50).required(),
    state: Joi.string().min(2).max(50).allow(null).optional(),
    postalCode: Joi.string().min(5).max(15).allow(null).optional(),
    country: Joi.string().min(2).max(50).required(),
    salesRepEmployeeNumber: Joi.number().positive().allow(null).optional(),
    creditLimit: Joi.number()
      .precision(2)
      .max(99999999.99)
      .allow(null)
      .optional(),
  }).options({ abortEarly: false }),
});

const customerCreateSchema = Joi.object({
  customerNumber: Joi.number().positive().required(),
  customerName: Joi.string().min(5).max(50).required(),
  contactLastName: Joi.string().min(3).max(50).required(),
  contactFirstName: Joi.string().min(3).max(50).required(),
  phone: Joi.string().min(8).max(20).required(),
  addressLine1: Joi.string().min(10).max(50).required(),
  addressLine2: Joi.string().min(10).max(50).allow(null).optional(),
  city: Joi.string().min(2).max(50).required(),
  state: Joi.string().min(2).max(50).allow(null).optional(),
  postalCode: Joi.string().min(5).max(15).allow(null).optional(),
  country: Joi.string().min(2).max(50).required(),
  salesRepEmployeeNumber: Joi.number().positive().allow(null).optional(),
  creditLimit: Joi.number()
    .precision(2)
    .max(99999999.99)
    .allow(null)
    .optional(),
}).options({ abortEarly: false });

const customerPostValidation = celebrate({
  [Segments.BODY]: customerCreateSchema,
});

export { customerPostValidation, customerPutValidation, customerCreateSchema };
