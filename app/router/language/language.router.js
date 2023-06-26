import { Router } from 'express';
import { languageController } from '../../http/controllers/language.controller.js';
export const LanguageRoutes = Router();

LanguageRoutes.get('/:lng', languageController.changeLanguage);
LanguageRoutes.get('/', languageController.readLanguage);
