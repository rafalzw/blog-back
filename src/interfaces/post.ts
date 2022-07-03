import { PostEntity } from '../posts/post.entity';
import { User } from '../users/user.entity';

export interface PostInterface {
  id: string;
  title: string;
  content: string;
  photo: string;
  user: User;
}

export type AddPostResponse = PostEntity;

export type UpdatePostResponse = {
  id: string;
  title: string;
};

export type DeletePostResponse = { isSuccess: boolean };
