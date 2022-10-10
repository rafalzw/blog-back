import { IsNotEmpty, IsString } from 'class-validator';
import { UserInterface } from '../../types';

export class AddPostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsString()
  userId: UserInterface;
}
