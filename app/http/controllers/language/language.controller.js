import { InternalServerException } from '../../../exceptions/exceptions.js';
import { UserModel } from '../../../models/user.js';
import { StatusCodes } from 'http-status-codes';
import { Controller } from '../controller.js';
import jwt from 'jsonwebtoken';
import moment from 'moment';

class LanguageController extends Controller {
  async changeLanguage(req, res, next) {
    try {
      const { lng } = req.params;

      // check user login
      const user = this.checkLogin(req);

      if (user) {
        const { id } = user;
        const updateUser = await UserModel.updateOne(
          { _id: id },
          { language: lng },
        );

        if (updateUser.modifiedCount == 0)
          throw InternalServerException();
      }

      // set language in header
      req.i18n.changeLanguage(lng);

      // change date and time
      const time = moment().locale(lng);

      const message = req.t('change_lng');

      return res.status(StatusCodes.OK).json({
        message,
        time,
      });
    } catch (error) {
      next(error);
    }
  }

  async readLanguage(req, res, next) {
    try {
      let language;
      const checkUser = this.checkLogin(req);

      if (checkUser) {
        const user = await UserModel.findById(checkUser.id);
        language = user.language;
      } else {
        language = req.language;
      }

      return res.send(language);
    } catch (error) {
      next(error);
    }
  }

  checkLogin(req) {
    const secretKey = process.env.JWT_SECRET;
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) return false;

    const payload = jwt.verify(refreshToken, secretKey);
    return payload;
  }
}

export const languageController = new LanguageController();
