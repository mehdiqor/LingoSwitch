import { blogValidation } from '../../validators/blog.validator.js';
import { BlogModel } from '../../../models/blog.js';
import { StatusCodes } from 'http-status-codes';
import { Controller } from '../controller.js';
import {
  myInternalServerError,
  myNotFound,
} from '../../../error/exceptions.js';

class BlogController extends Controller {
  async addBlog(req, res, next) {
    try {
      // validate request
      await blogValidation.validateAsync(req.body);
      const { title, en, fr, de, fa } = req.body;
      const author = req.user._id;

      const createBlog = await BlogModel.create({
        author,
        title,
        text: {
          en,
          fr,
          de,
          fa,
        },
      });

      if (!createBlog) throw myInternalServerError();

      const lng = req.headers['accept-language'];
      const message = req.t('add_blog', { lng });

      return res.status(StatusCodes.CREATED).json({
        message,
        blog: createBlog,
      });
    } catch (error) {
      next(error);
    }
  }

  async getBlogbyId(req, res, next) {
    try {
      const { id } = req.params;
      const language = req.headers['accept-language'];

      // find blog
      const blog = await BlogModel.findById(id);
      if (!blog) throw myNotFound();

      return res.status(StatusCodes.OK).json({
        data: blog.text.get(language),
      });
    } catch (error) {
      next(error);
    }
  }
}

export const blogController = new BlogController();
