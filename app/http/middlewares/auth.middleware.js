import { expressjwt } from 'express-jwt';
import createHttpError from 'http-errors';
import { config } from 'dotenv';
config();

const secretKey = process.env.JWT_SECRET;

export const authenticateToken = expressjwt({
  secret: secretKey,
  algorithms: ['HS256'],
  getToken: function fromHeaderOrQuerystring(req) {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      return req.headers.authorization.split(' ')[1];
    }
    return createHttpError.Unauthorized();
  },
});
