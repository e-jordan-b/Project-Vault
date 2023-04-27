import * as express from 'express';
import { getUser, postUser } from '../controllers/controller';
import checkout from '../controllers/payment';
import {
  createPost,
  getPosts,
  getPostsById,
  followProject,
  updateProject,
  followingProjects,
  personalProjects,
  postComment
} from '../controllers/postController';

const router = express.Router();

// Login Routes
router.post('/login', getUser)
router.post('/register', postUser)

// Post Routes
router.post('/create', createPost)
router.get('/posts', getPosts)
router.get('/posts/:id', getPostsById)
router.post('/posts/follow', followProject)
router.get('/posts/following/:id', followingProjects)
router.get('/posts/personal/:id', personalProjects)
router.post('/posts/comments', postComment)

// Payment Route
router.post('/create-payment-intent', checkout)

// Update Routes
router.post('/update/:id', updateProject)

export = router;
