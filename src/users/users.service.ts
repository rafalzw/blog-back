import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { LoginUserResponse, RegisterUserResponse } from '../interfaces/user';
import { LoginDto } from './dto/login.dto';

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

  async login(user: LoginDto): Promise<LoginUserResponse> {
    const { email, password } = user;

    const userInDb = await User.findOne({ where: { email } });
    if (!userInDb) {
      throw new HttpException('Invalid email!', HttpStatus.BAD_REQUEST);
    }

    const validated = await bcrypt.compare(password, userInDb.password);
    if (!validated) {
      throw new HttpException('Invalid password!', HttpStatus.BAD_REQUEST);
    }

    return userInDb;
  }
}
