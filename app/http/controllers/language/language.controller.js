import { StatusCodes } from 'http-status-codes';
import { Controller } from '../controller.js';
import moment from 'moment';

class LanguageController extends Controller {
  changeLanguage(req, res, next) {
    try {
      const { lng } = req.params;

      // set language in cookies
      // res.cookie('lng', lng, {
      //   httpOnly: true,
      //   maxAge: 7 * 24 * 60 * 60 * 1000, // 1 Week
      // });

      // set language in headers
      res.setHeader('accept-language', lng);
      const message = req.t('change_lng', { lng });

      // change date and time
      moment.locale(lng);
      const time = moment();

      return res.status(StatusCodes.OK).json({
        message,
        time,
      });
    } catch (error) {
      next(error);
    }
  }

  readLanguage(req, res) {
    try {
      // const language = req.cookies.lng;
      const language = req.headers['accept-language'];

      return res.send(language);
    } catch (error) {
      next(error);
    }
  }
}

export const languageController = new LanguageController();
