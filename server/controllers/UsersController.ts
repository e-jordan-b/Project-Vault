import User from '../models/userModel';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';

export const getUser = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const checkPassword = await bcrypt.compare(password, user!.password);
    if (!checkPassword || user!.email !== email) {
      new Error('Username or password is incorrect');
    } else {
      return res.status(201).send(user);
    }
  } catch (error) {
    res
      .status(401)
      .send({ error: '401', message: 'Username or password is incorrect' });
  }
};

export const postUser = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  let user;
  try {
    user = await User.findOne({ email: req.body.email });
  } catch (error) {
    res.status(500).send({ error, message: 'Could not find user' });
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
      res.status(400).send({ error, message: 'Could not create user' });
    }
  }
  if (user) res.status(401).json({ message: 'email already in use' });
};
