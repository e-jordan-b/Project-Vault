import * as express from 'express';
import { login, register } from '../controllers/UsersController';
import checkout from '../controllers/paymentController';
import {
  createProject,
  getProjects,
  getProjectById,
  followProject,
  updateProject,
  followingProjects,
  personalProjects,
  postComment,
} from '../controllers/projectController';

const router = express.Router();

// Login Routes
router.post('/login', login);
router.post('/register', register);

// Post Routes
router.get('/projects', getProjects);
router.get('/projects/:id', getProjectById);
router.post('/create', createProject);
router.post('/projects/follow', followProject);
router.post('/projects/comments', postComment);
router.get('/projects/following/:id', followingProjects);
router.get('/projects/personal/:id', personalProjects);

// Payment Route
router.post('/create-payment-intent', checkout);

// Update Routes
router.post('/update/:id', updateProject);

export = router;
