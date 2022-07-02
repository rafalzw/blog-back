export interface UserInterface {
  id: string;
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
}

export type RegisterUserResponse = {
  id: string;
  email: string;
};

export type LoginUserResponse = {
  id: string;
  email: string;
};
