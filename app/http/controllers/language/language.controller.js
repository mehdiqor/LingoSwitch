import { Controller } from '../controller.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { EventEmitter } from 'events';
import moment from 'moment';

class LanguageController extends Controller {
  changeLanguage(req, res, next) {
    try {
      const { lng } = req.params;

      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);

      const fileDir = join(
        __dirname,
        '..',
        '..',
        '..',
        `/locales/${lng}/translation.json`,
      );

      // set language in cookies
      res.cookie('lng', lng, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 1 Week
      });

      // change date and time
      moment.locale(lng);

      return res.sendFile(fileDir);
    } catch (error) {
      next(error);
    }
  }

  async readLanguage(req, res) {
    try {
      const language = req.cookies.lng;

      // it can listen to events!
      const myEventEmitter = new EventEmitter();
      myEventEmitter.on('language', (resolve) => {
        resolve(language);
      });

      return res.send(language);
    } catch (error) {
      next(error);
    }
  }
}

export const languageController = new LanguageController();
