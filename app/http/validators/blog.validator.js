import httpError from 'http-errors';
import joi from '@hapi/joi';

export const blogValidation = joi.object({
  title: joi
    .string()
    .required()
    .min(3)
    .max(20)
    .error(httpError.BadRequest()),
  en: joi
    .string()
    .optional()
    .min(5)
    .error(httpError.BadRequest()),
  fr: joi
    .string()
    .optional()
    .min(5)
    .error(httpError.BadRequest()),
  de: joi
    .string()
    .optional()
    .min(5)
    .error(httpError.BadRequest()),
  fa: joi
    .string()
    .optional()
    .min(5)
    .error(httpError.BadRequest()),
});
