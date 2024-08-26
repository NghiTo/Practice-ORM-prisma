import { celebrate, Segments, Joi } from "celebrate";

const reportGetValidation = celebrate({
  [Segments.QUERY]: Joi.object()
    .keys({
      officeCode: Joi.string().optional(),
      start_date: Joi.date().iso().required().messages({
        "date.base": "startDate should be a valid date",
        "date.format": "startDate should follow the format 'YYYY-MM-DD'",
      }),
      end_date: Joi.date().iso().required().messages({
        "date.base": "endDate should be a valid date",
        "date.format": "endDate should follow the format 'YYYY-MM-DD'",
      }),
      employeeNumber: Joi.number().positive().optional().messages({
        "number.base": "employeeNumber should be a number",
        "number.positive": "employeeNumber should be a positive number",
      }),
    })
    .options({
      abortEarly: false,
    }),
});

export default reportGetValidation;
