import express from 'express';
import * as blogController from '../controllers/blogController.js';

const router = express.Router();

//get all posts
router.get('/', blogController.getAllBlogs);

//get post by ID
router.get('/:id', blogController.getBlogByID);

//creating a new post
router.post('/', blogController.createBlogPost);

//like post
router.put('/like/:id', blogController.likeBlogPost);

//add comment
router.post('/:id/comment/', blogController.addBlogComment);

//like comment
router.put('/:id/comment/like/:commentIndex', blogController.likeBlogComment);

//delete post
router.delete('/:id', blogController.deleteBlogPost);

export default router;