import httpError from 'http-errors';
import joi from '@hapi/joi';

export const signupValidation = joi.object({
  email: joi.string().email().error(httpError.BadRequest()),
  password: joi
    .string()
    .min(5)
    .error(httpError.BadRequest()),
});
