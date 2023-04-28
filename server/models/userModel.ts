import mongoose from '../db';
import projectSchema from './projectModel';

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
  },
  following: [String],
  createdProjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'projectSchema',
    },
  ],
});

export default mongoose.model('Users', userSchema);
