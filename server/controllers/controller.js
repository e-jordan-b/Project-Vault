const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.getUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword || user.email !== email) {
      return res.status(401).json({ message: 'Wrong email or password' });
    } else {
      return res.status(201).send(user);
    }
  } catch (error) {
    res
      .status(401)
      .send({ error: '401', message: 'Username or password is incorrect' });
  }
};

// naming and validation
exports.postUser = async (req, res) => {
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    try {
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
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
      res.status(400).send({ error, message: 'Could not create user' });
    }
  }
  if (user) res.status(401).json({ message: 'email already in use' });
};
