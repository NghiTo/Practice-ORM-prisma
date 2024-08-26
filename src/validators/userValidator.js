import { Joi, celebrate, Segments } from "celebrate";

const userValidation = celebrate({
  [Segments.BODY]: Joi.object({
    username: Joi.string().min(3).max(20).required(),
    password: Joi.string()
      .min(6)
      .max(100)
      .required()
      .pattern(new RegExp("(?=.*[0-9])"))
      .pattern(new RegExp("(?=.*[!@#$%^&*])")),
    employeeNumber: Joi.number().positive().required(),
  }).options({ abortEarly: false }),
});

export default userValidation;
