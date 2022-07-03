import { User } from '../../users/user.entity';

export class AddPostDto {
  title: string;
  content: string;
  photo: string;
  userId: User;
}
