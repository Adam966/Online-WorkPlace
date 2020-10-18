export interface UserModel {
  id: number;
  userName: string;
  userSurname: string;
  email: string;
  photo?: string;
  token?: string;
}
