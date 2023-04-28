import mongoose from '../db';

export const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  secondName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  picturePath: {
    type: String,
    default: '',
  },
  following: {
    type: [String],
    default: [],
  },
  createdProjects: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'projectSchema',
      },
    ],
    default: [],
  },
});

export default mongoose.model('Users', userSchema);
