import mongoose from '../db.js';

const UpdateSchema = new mongoose.Schema({
  // _id: {
  //   type: String,
  //   required: true,
  // },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  video: {
    type: String,
  },
  chat: [String],
});

const ChatMessageSchema = new mongoose.Schema({
  createdBy: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const projectSchema = new mongoose.Schema({
  // id: {
  //   type: String,
  //   required: true
  // },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  updates: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UpdateSchema',
    },
  ],
  author: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  chat: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ChatMessageSchema',
    },
  ],
  tags: [String],
  followers: [String],
});

export default mongoose.model('Projects', projectSchema);
