import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import {
  LoginUserResponse,
  RegisterUserResponse,
  UpdateUserResponse,
} from '../interfaces/user';
import { LoginDto } from './dto/login.dto';
import { UpdateDto } from './dto/update.dto';

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

  async update(id: string, user: UpdateDto): Promise<any> {
    if (user.id !== id) {
      throw new HttpException(
        'You can update only your account!!',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (user.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }

    const updatedUser = await User.findOne({ where: { id } });
    updatedUser.username = user.username;
    updatedUser.email = user.email;
    updatedUser.password = user.password;
    updatedUser.profilePicture = user.profilePicture;

    await updatedUser.save();

    return updatedUser;
  }
}

// const data = await this.dataSource.createQueryBuilder();
// .update(User)
// .set({
//   username: user.username,
//   email: user.email,
//   password: user.password,
//   profilePicture: user.profilePicture,
// })
// .where('id = :id', { id })
// .execute();

// return data;
