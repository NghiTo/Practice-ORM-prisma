import { Joi, celebrate, Segments } from "celebrate";

const officePostValidation = celebrate({
  [Segments.BODY]: Joi.object({
    officeCode: Joi.string().max(10),
    city: Joi.string().min(2).max(50).required(),
    phone: Joi.string().min(8).max(20).required(),
    addressLine1: Joi.string().min(10).max(50).required(),
    addressLine2: Joi.string().min(10).max(50).allow(null).optional(),
    state: Joi.string().min(2).max(50).allow(null).optional(),
    postalCode: Joi.string().min(5).max(15).allow(null).optional(),
    country: Joi.string().min(2).max(50).required(),
    territory: Joi.string().min(2).max(50).required(),
  }).options({ abortEarly: false }),
});

export { officePostValidation };
