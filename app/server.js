import { AllRoutes } from './router/router.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import cookieParser from 'cookie-parser';
import httpError from 'http-errors';
import mongoose from 'mongoose';
import express from 'express';
import morgan from 'morgan';
import http from 'http';
import cors from 'cors';
import { join } from 'path';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import i18nextMiddleware from 'i18next-express-middleware';
import { config } from 'dotenv';
config();

export class Application {
  #app = express();
  #HOST = process.env.BASE_URL;
  #PORT;
  #DB_URI;
  constructor(PORT, DB_URI) {
    this.#PORT = PORT;
    this.#DB_URI = DB_URI;
    this.configApplication();
    this.createServer();
    this.connectToMongoDB();
    this.createRoutes();
    this.errorHandling();
    this.internationalization();
  }

  configApplication() {
    this.#app.use(cors());
    this.#app.use(cookieParser());
    this.#app.use(morgan('dev'));
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
    this.#app.use(i18nextMiddleware.handle(i18next));
    this.#app.use((req, res, next) => {
      let lang = req.cookies.lng;
      if (!lang) lang = 'fa';
      req.i18n.changeLanguage(lang);
      next();
    });
    this.#app.use(
      '/swagger',
      swaggerUi.serve,
      swaggerUi.setup(
        swaggerJsDoc({
          swaggerDefinition: {
            openapi: '3.0.0',
            info: {
              title: 'i4twins',
              version: '1.0.0',
              description: 'LingoSwitch',
              contact: {
                name: 'Mehdi Ghorbani',
                url: 'https://github.com/mehdiqor',
                email: 'mehdighorbanin@gmail.com',
              },
            },
            servers: [
              {
                url: `${this.#HOST}:${this.#PORT}`,
              },
            ],
            components: {
              securitySchemes: {
                BearerAuth: {
                  type: 'http',
                  scheme: 'bearer',
                  bearerFormat: 'JWT',
                },
              },
            },
            security: [{ BearerAuth: [] }],
          },
          apis: ['./app/router/swagger/*.js'],
        }),
        { explorer: true },
      ),
    );
  }

  createServer() {
    const server = http.createServer(this.#app);
    server.listen(this.#PORT, () => {
      console.log(
        `application is running -> ${this.#HOST}:${
          this.#PORT
        }`,
      );
    });
  }

  connectToMongoDB() {
    mongoose.connect(this.#DB_URI);

    mongoose.connection.on('connected', () => {
      console.log('mongoose connected to DB');
    });
    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose is disconnected from DB');
    });
    process.on('SIGINT', () => {
      mongoose.connection.close();
      console.log('connection was closed successfully');
      process.exit();
    });
  }

  createRoutes() {
    this.#app.use(AllRoutes);
  }

  errorHandling() {
    this.#app.use((req, res, next) => {
      next(httpError.NotFound());
    });
    this.#app.use((error, req, res, next) => {
      const serverError = httpError.InternalServerError();
      const statusCode = error.status || serverError.status;
      const message = error.message || serverError.message;
      return res.status(statusCode).json({
        errors: {
          statusCode,
          message,
        },
      });
    });
  }

  internationalization() {
    i18next
      .use(Backend)
      .use(i18nextMiddleware.LanguageDetector)
      .init({
        backend: {
          loadPath: join(
            '..',
            '/locales/{{lng}}/translation.json',
          ),
        },
        fallbackLng: 'en',
        preload: ['en', 'fr', 'de', 'fa'],
        saveMissing: true
      });
  }
}
