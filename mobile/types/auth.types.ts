export interface IUser {
  _id: string;
  username: string;
  email: string;
}

export interface AuthResponse {
  user: {
    _id: string;
    email: string;
    username: string;
  };
  token: string;
}