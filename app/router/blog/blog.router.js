import { blogController } from '../../http/controllers/blog/blog.controller.js';
import { Router } from 'express';
export const BlogRoutes = Router();

BlogRoutes.post('/add', blogController.addBlog);
BlogRoutes.get('/:id', blogController.getBlogbyId);
