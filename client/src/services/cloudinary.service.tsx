import axios from 'axios';
import CloudinaryUploadResponse from '../types/cloudinary.type';

const API_URL = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_KEY}/image/upload`;

class CloudinaryService {
  uploadImage(data: FormData) {
    return axios.post<CloudinaryUploadResponse>(API_URL, data);
  }
}

export default new CloudinaryService();
