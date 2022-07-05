export interface UserInterface {
  id: string;
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
  createdAt: Date | string;
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
};

export type UpdateUserResponse = {
  id: string;
  username: string;
  email: string;
};

export type DeleteUserResponse = { isSuccess: boolean };

export type GetOneUserResponse = Pick<
  UserInterface,
  'id' | 'username' | 'email' | 'profilePicture'
>;
