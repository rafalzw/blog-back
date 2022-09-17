import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import {
  DeleteUserResponse,
  GetOneUserResponse,
  LoginUserResponse,
  RegisterUserResponse,
  UpdateUserResponse,
  UserInterface,
} from '../types/user';
import { LoginDto } from './dto/login.dto';
import { UpdateDto } from './dto/update.dto';
import { DeleteDto } from './dto/delete.dto';
import { MulterDiskUploadedFiles } from '../types/files';
import fs from 'fs';
import path from 'path';
import { storageDir } from '../utils/storage';

@Injectable()
export class UserService {
  filter(user: User): UserInterface {
    const { id, username, email, profilePicture } = user;
    return { id, username, email, profilePicture };
  }

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
      username: newUser.username,
      email: newUser.email,
    };
  }

  async login(user: LoginDto): Promise<LoginUserResponse> {
    const { username, password } = user;

    const userInDb = await User.findOne({ where: { username } });
    if (!userInDb) {
      throw new HttpException('Invalid email!', HttpStatus.BAD_REQUEST);
    }

    const validated = await bcrypt.compare(password, userInDb.password);
    if (!validated) {
      throw new HttpException('Invalid password!', HttpStatus.BAD_REQUEST);
    }

    return {
      id: userInDb.id,
      username: userInDb.username,
      email: userInDb.email,
      profilePicture: userInDb.profilePicture,
    };
  }

  async update(
    id: string,
    user: UpdateDto,
    files: MulterDiskUploadedFiles,
  ): Promise<UpdateUserResponse> {
    const photo = files?.photo?.[0] ?? null;
    console.log(user);

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

    try {
      const updatedUser = await User.findOne({ where: { id } });
      updatedUser.username = user.username;
      updatedUser.email = user.email;
      updatedUser.password = user.password;

      if (photo) {
        updatedUser.profilePicture = photo.filename;
      }

      await updatedUser.save();

      return {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        profilePicture: updatedUser.profilePicture,
      };
    } catch (e) {
      try {
        if (photo) {
          fs.unlinkSync(path.join(storageDir(), 'user-photos', photo.filename));
        }
      } catch (e2) {}

      throw e;
    }
  }

  async delete(id: string, user: DeleteDto): Promise<DeleteUserResponse> {
    if (id !== user.id) {
      throw new HttpException(
        'You can delete only your account!!',
        HttpStatus.BAD_REQUEST,
      );
    }
    await User.delete(id);

    return { isSuccess: true };
  }

  async getOne(id: string): Promise<GetOneUserResponse> {
    const user = await User.findOneOrFail({ where: { id } });

    return this.filter(user);
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
