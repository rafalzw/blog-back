export interface UserInterface {
  id: string;
  username: string;
  email: string;
  profilePicture?: string;
}

export type RegisterUserResponse = {
  id: string;
  username: string;
  email: string;
};

export type LoginUserResponse = {
  id: string;
  username: string;
  email: string;
  profilePicture: string;
};

export type UpdateUserResponse = UserInterface;

export type DeleteUserResponse = { isSuccess: boolean };

export type GetOneUserResponse = UserInterface;
