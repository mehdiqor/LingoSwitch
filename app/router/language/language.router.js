import { languageController } from '../../http/controllers/language/language.controller.js';
import { Router } from 'express';
export const LanguageRoutes = Router();

LanguageRoutes.get('/tfunction', languageController.tFunction);
LanguageRoutes.get('/:lng', languageController.changeLanguage);
LanguageRoutes.get('/', languageController.readLanguage);
