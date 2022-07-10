import { UserInterface } from './user';

export interface PostInterface {
  id: string;
  title: string;
  content: string;
  photo?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  user?: UserInterface;
}

export type AddPostResponse = PostInterface;

export type GetAllPostsResponse = PostInterface[];

export type GetOnePostResponse = PostInterface;

export type UpdatePostResponse = {
  id: string;
  title: string;
};

export type DeletePostResponse = { isSuccess: boolean };
