const mongoose = require('../db.js')

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  secondName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  picturePath: {
    type: String
  },
  following: [String],
  createdPosts: [String]
})

module.exports = mongoose.model('Users', userSchema)
