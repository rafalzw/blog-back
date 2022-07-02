import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserResponse } from '../interfaces/user';
import { RegisterDto } from './dto/register.dto';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {}

  @Post('/register')
  registerUser(@Body() user: RegisterDto): Promise<RegisterUserResponse> {
    return this.usersService.register(user);
  }
}
