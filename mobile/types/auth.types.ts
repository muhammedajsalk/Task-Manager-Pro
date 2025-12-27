export interface IUser {
  _id: string;
  username: string;
  email: string;
}

export interface AuthResponse {
  _id: string;
  username: string;
  email: string;
  token: string;
}