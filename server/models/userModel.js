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
  createdPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Posts'
    }]
})

module.exports = mongoose.model('Users', userSchema)
