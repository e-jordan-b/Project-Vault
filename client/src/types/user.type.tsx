export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  picturepath: string;
  following: string[];
  createdProjects: string[];
}

export type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};