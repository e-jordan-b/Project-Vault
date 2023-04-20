const mongoose = require('../db.js')

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  updates: {
    type: String
  },
  createdBy: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  chat: [String],
  tags: [String],
  followers: [String]
})

module.exports = mongoose.model('Posts', postSchema)
