import User from '../models/userModel';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';

export const login = async (
  req: Request,
  res: Response,
  next: any
): Promise<Response | void> => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const checkPassword = user
      ? await bcrypt.compare(req.body.password, user.password)
      : false;
    if (!checkPassword || !user) {
      throw new Error('Username or password is incorrect');
    } else {
      return res.status(200).send(user);
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: any
): Promise<Response | void> => {
  let user;
  try {
    user = await User.findOne({ email: req.body.email });
  } catch (error) {
    res.status(500).json({ error, message: 'Could not find user' });
  }
  if (!user) {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    try {
      const newUser = new User({
        firstName: req.body.firstName,
        secondName: req.body.secondName,
        email: req.body.email,
        password: hashPassword,
        picturePath: '',
        following: [],
        createdPosts: [],
      });
      await newUser.save();
      console.log('succes');
      res.status(201).send({ newUser });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error, message: 'Could not create user' });
    }
  }
  if (user) res.status(401).json({ message: 'email already in use' });
};
