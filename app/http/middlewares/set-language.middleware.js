import jwt from 'jsonwebtoken';
import { UserModel } from '../../models/user.js';

export async function setLanguage(req, res, next) {
  let lang = 'en';

  const user = await getUser(req);
  if (user) {
    lang = user.language;
  } else {
    lang = req.headers['accept-language'];
  }

  req.i18n.changeLanguage(lang);
  req.language = lang;

  return next();
}

async function getUser(req) {
  const secretKey = process.env.JWT_SECRET;
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) return false;

  const { id } = jwt.verify(refreshToken, secretKey);

  const user = await UserModel.findOne({ _id: id });

  return user;
}
