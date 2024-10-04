import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { Serialize } from '../interceptor/serialize.interceptor';
import { UserDTO } from './dtos/user.dto';
import { LoginUserDTO } from './dtos/login-user.dto';
@Controller('users')
export class UsersController {
  @Serialize(UserDTO)
  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  // take the service and inject it into the controller
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}
  // create a new user
  @Serialize(CreateUserDto)
  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body.name, body.email, body.password);
  }

  // interceptor membatasi hasil response
  @Serialize(UserDTO)
  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.usersService.findOneBy(parseInt(id));
  }

  // update a user
  @Serialize(CreateUserDto)
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: Partial<CreateUserDto>) {
    return this.usersService.update(parseInt(id), body);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Serialize(UserDTO)
  @Post('/register')
  async register(@Body() body: CreateUserDto) {
    return this.authService.register(body.name, body.email, body.password);
  }

  @Post('/login')
  async login(@Body() body: LoginUserDTO) {
    return this.authService.login(body.email, body.password);
  }
}
