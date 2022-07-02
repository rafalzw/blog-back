import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { RegisterUserResponse } from '../interfaces/user';

@Injectable()
export class UsersService {
  async register(user: RegisterDto): Promise<RegisterUserResponse> {
    const { username, email, password } = user;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User();
    newUser.username = username;
    newUser.email = email;
    newUser.password = hashedPassword;

    await newUser.save();

    return {
      id: newUser.id,
      email: newUser.email,
    };
  }
}
