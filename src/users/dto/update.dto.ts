import { IsString } from 'class-validator';

export class UpdateDto {
  @IsString()
  id: string;

  @IsString()
  username: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
