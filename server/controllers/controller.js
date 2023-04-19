const User = require('../models/userModel')
const bcrypt = require('bcrypt')

exports.getUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email: email })
    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword || !email) throw new Error('Invalid email or password')
    res.status(201).send(user)
  } catch (error) {
    res
      .status(401)
      .send({ error: '401', message: 'Username or password is incorrect' })
  }
}

exports.postUser = async (req, res) => {
  const hashPassword = await bcrypt.hash(req.body.password, 10)
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    try {
      const newUser = new User({
        firstName: req.body.firstName,
        secondName: req.body.secondName,
        email: req.body.email,
        password: hashPassword,
        picturePath: '',
        following: [],
        createdPosts: []
      })
      await newUser.save()
      res.status(201).send({ newUser })
    } catch (error) {
      res.status(400).send({ error, message: 'Could not create user' })
    }
  }
  if (user) throw new Error('email already in use')
}
