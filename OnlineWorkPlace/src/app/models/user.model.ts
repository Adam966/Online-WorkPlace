export interface UserModel {
  id?: number;
  username: string;
  usersurname: string;
  email?: string;
  photo?: string;
  token?: string;
}

export interface User {
  username: string;
  usersurname: string;
  photo: number;
}
