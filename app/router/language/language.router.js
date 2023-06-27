import { languageController } from '../../http/controllers/language/language.controller.js';
import { Router } from 'express';
export const LanguageRoutes = Router();

LanguageRoutes.get('/', languageController.readLanguage);
LanguageRoutes.get('/:lng', languageController.changeLanguage);
