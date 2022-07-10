import { User } from '../../users/user.entity';
import { IsString } from 'class-validator';

export class AddPostDto {
  @IsString()
  title: string;
  @IsString()
  content: string;
  // photo: string;
  userId: User;
}
