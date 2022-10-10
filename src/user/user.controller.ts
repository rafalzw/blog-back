import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  DeleteUserResponse,
  GetOneUserResponse,
  LoginUserResponse,
  RegisterUserResponse,
  UpdateUserResponse,
} from '../types/user';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateDto } from './dto/update.dto';
import { DeleteDto } from './dto/delete.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerStorage, storageDir } from '../utils/storage';
import * as path from 'path';
import { MulterDiskUploadedFiles } from '../types/files';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserService) private readonly usersService: UserService,
  ) {}

  @Post('/register')
  registerUser(@Body() user: RegisterDto): Promise<RegisterUserResponse> {
    return this.usersService.register(user);
  }

  @Post('/login')
  loginUser(@Body() user: LoginDto): Promise<LoginUserResponse> {
    return this.usersService.login(user);
  }

  @Put('/:id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'photo',
          maxCount: 1,
        },
      ],
      { storage: multerStorage(path.join(storageDir(), 'user-photos')) },
    ),
  )
  updateUser(
    @Body() user: UpdateDto,
    @Param('id') id: string,
    @UploadedFiles() files: MulterDiskUploadedFiles,
  ): Promise<UpdateUserResponse> {
    return this.usersService.update(id, user, files);
  }

  @Delete('/:id')
  deleteUser(
    @Body() user: DeleteDto,
    @Param('id') id: string,
  ): Promise<DeleteUserResponse> {
    return this.usersService.delete(id, user);
  }

  @Get('/:id')
  getOneUser(@Param('id') id: string): Promise<GetOneUserResponse> {
    return this.usersService.getOne(id);
  }
}
