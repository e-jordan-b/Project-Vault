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

router.post('/login', login);
router.post('/register', register);

router.get('/projects', getProjects);
router.get('/projects/:id', getProjectById);
router.post('/create', createProject);
router.post('/projects/follow', followProject);
router.post('/projects/comments', postComment);
router.get('/projects/following/:id', followingProjects);
router.get('/projects/personal/:id', personalProjects);

router.post('/create-payment-intent', checkout);

router.post('/update/:id', updateProject);

export = router;
