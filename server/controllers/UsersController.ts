import User from '../models/userModel';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';

const login = [
  body('email').trim().isEmail().withMessage('Invalid email format'),
  body('password').trim().notEmpty().withMessage('Password is required'),
  async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        throw new Error('Invalid email or password');
      }

      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordValid) {
        throw new Error('Invalid email or password');
      }
      res.status(200).json({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    } catch (e) {
      const error = e as Error;
      res.status(401).json({ message: error.message });
    }
  },
];

const register = [
  body('email').trim().isEmail().withMessage('Invalid email format'),
  body('password').trim().notEmpty().withMessage('Password is required'),
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        throw new Error('Email already in use');
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
      });

      res.status(201).json({
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      });
    } catch (e) {
      const error = e as Error;
      const status = error.message === 'Email already in use' ? 409 : 400;
      res.status(status).json({ message: error.message });
    }
  },
];

export { register, login };
