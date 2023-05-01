export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  picturepath: string;
  following: string[];
  createdProjects: string[];
}

export interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
