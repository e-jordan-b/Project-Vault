import mongoose from 'mongoose';

const UpdateSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: String,
  },
  image: {
    type: String,
  },
  video: {
    type: String,
  },
  chat: [String],
  donationsCents: Number,
});

const ChatMessageSchema = new mongoose.Schema({
  createdBy: {
    type: String,
  },
  comment: {
    type: String,
  },
  date: {
    type: String,
  },
});

export const projectSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  updates: [UpdateSchema],
  author: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userSchema',
  },
  date: String,
  chat: [ChatMessageSchema],
  tags: [String],
  followers: [String],
  donationsCents: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model('Projects', projectSchema);
