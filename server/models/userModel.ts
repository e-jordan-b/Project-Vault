import mongoose from '../db.js';
import Project from './projectModel.js';

const userSchema = new mongoose.Schema({
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
  createdProjects: [Project],
});

export default mongoose.model('Users', userSchema);
