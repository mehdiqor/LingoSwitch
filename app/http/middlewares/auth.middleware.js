import { UnathorizedException } from '../../exceptions/exceptions.js';
import { UserModel } from '../../models/user.js';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

const secretKey = process.env.JWT_SECRET;

function getToken(headers) {
  const [bearer, token] =
    headers?.authorization?.split(' ') || [];

  if (token && ['bearer', 'Bearer'].includes(bearer))
    return token;

  throw UnathorizedException();
}

export function verifyAccessToken(req, res, next) {
  try {
    const token = getToken(req.headers);

    jwt.verify(token, secretKey, async (err, payload) => {
      if (err) throw UnathorizedException();

      const { id } = payload || {};
      const user = await UserModel.findOne(
        { _id: id },
        { password: 0 },
      );

      if (!user) throw UnathorizedException();

      req.user = user;
      return next();
    });
  } catch (error) {
    next(error);
  }
}
