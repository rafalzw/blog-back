import {
  Body,
  Controller,
  Delete,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  DeleteUserResponse,
  LoginUserResponse,
  RegisterUserResponse,
  UpdateUserResponse,
} from '../interfaces/user';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateDto } from './dto/update.dto';
import { DeleteDto } from './dto/delete.dto';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {}

  @Post('/register')
  registerUser(@Body() user: RegisterDto): Promise<RegisterUserResponse> {
    return this.usersService.register(user);
  }

  @Post('/login')
  loginUser(@Body() user: LoginDto): Promise<LoginUserResponse> {
    return this.usersService.login(user);
  }

  @Patch('/:id')
  updateUser(
    @Body() user: UpdateDto,
    @Param('id') id: string,
  ): Promise<UpdateUserResponse> {
    return this.usersService.update(id, user);
  }

  @Delete('/:id')
  deleteUser(
    @Body() user: DeleteDto,
    @Param('id') id: string,
  ): Promise<DeleteUserResponse> {
    return this.usersService.delete(id, user);
  }
}
