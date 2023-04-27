import hhtp from '../http-common';
import User from '../types/user.type';
import Project from '../types/project.type';
class ApiService {
  updateProject(data: Project, id: string) {
    return hhtp.put<any>(`/projects/${data.id}`, data);
  }
}
