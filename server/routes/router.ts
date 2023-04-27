import * as express from 'express';
// import { getUser, postUser } from '../controllers/controller';
import checkout from '../controllers/payment';
import {
  createProject,
  getProjects,
  getProjectsById,
  followProject,
  updateProject,
  followingProjects,
  personalProjects,
  postComment,
} from '../controllers/projectController';

const router = express.Router();

// Login Routes
// router.post('/login', getUser);
// router.post('/register', postUser);

// Post Routes
router.post('/create', createProject);
router.get('/posts', getProjects);
router.get('/posts/:id', getProjectsById);
router.post('/posts/follow', followProject);
router.get('/posts/following/:id', followingProjects);
router.get('/posts/personal/:id', personalProjects);
router.post('/posts/comments', postComment);

// Payment Route
router.post('/create-payment-intent', checkout);

// Update Routes
router.post('/update/:id', updateProject);

export = router;
