import { Joi, celebrate, Segments } from "celebrate";

const logPutValidation = celebrate({
  [Segments.BODY]: Joi.object({
    level: Joi.string().valid("Error", "Warning", "Info").required(),
  }).unknown(false),
});

const logGetValidation = celebrate({
  [Segments.QUERY]: Joi.object()
    .keys({
      level: Joi.string()
        .valid("Error", "Warning", "Info")
        .insensitive()
        .messages({
          "string.base": "level should be a string",
          "any.only": "level should be one of 'Error', 'Warning', 'Info'",
        }),
      user: Joi.string().trim().insensitive().messages({
        "string.base": "user should be a string",
      }),
      startDate: Joi.date().iso().messages({
        "date.base": "startDate should be a valid date",
        "date.format": "startDate should follow the format 'YYYY-MM-DD'",
      }),
      endDate: Joi.date().iso().messages({
        "date.base": "endDate should be a valid date",
        "date.format": "endDate should follow the format 'YYYY-MM-DD'",
      }),
    })
    .options({
      abortEarly: false,
    }),
});

export { logPutValidation, logGetValidation };
