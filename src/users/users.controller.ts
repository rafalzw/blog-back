import { Body, Controller, Inject, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginUserResponse, RegisterUserResponse } from '../interfaces/user';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

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
}
