import { User } from 'src/users/user.entity';

export class UpdatePostDto {
  id: string;
  title: string;
  content: string;
  photo: string;
  updatedAt: Date;
  user: User;
}
