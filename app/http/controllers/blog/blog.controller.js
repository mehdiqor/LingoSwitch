import createHttpError from 'http-errors';
import { BlogModel } from '../../../models/blog.js';
import { blogValidation } from '../../validators/blog.validator.js';
import { StatusCodes } from 'http-status-codes';
import { Controller } from '../controller.js';
import jwt from 'jsonwebtoken';

class BlogController extends Controller {
  async addBlog(req, res, next) {
    try {
      // validate request
      await blogValidation.validateAsync(req.body);
      const { title, en, fr, de, fa } = req.body;

      const secretKey = process.env.JWT_SECRET;
      const refreshToken = req.cookies.refresh_token;
      const { id } = jwt.verify(refreshToken, secretKey);

      const createBlog = await BlogModel.create({
        author: id,
        title,
        text: {
          en,
          fr,
          de,
          fa,
        },
      });

      if (!createBlog)
        throw createHttpError.InternalServerError();

      return res.status(StatusCodes.CREATED).json({
        status: StatusCodes.CREATED,
        blog: createBlog,
      });
    } catch (error) {
      next(error);
    }
  }

  async getBlogbyId(req, res, next) {
    try {
      const { id } = req.params;
      const language = req.cookies.lng;

      // find blog
      const blog = await BlogModel.findById(id);
      if (!blog) throw createHttpError.NotFound();

      return res.status(StatusCodes.OK).json({
        data: blog.text.get(language),
      });
    } catch (error) {
      next(error);
    }
  }
}

export const blogController = new BlogController();
