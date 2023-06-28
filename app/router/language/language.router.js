import { languageController } from '../../http/controllers/language/language.controller.js';
import { setLanguage } from '../../http/middlewares/set-language.middleware.js';
import { Router } from 'express';
export const LanguageRoutes = Router();

LanguageRoutes.get('/', setLanguage, languageController.readLanguage);
LanguageRoutes.get('/:lng', languageController.changeLanguage);
