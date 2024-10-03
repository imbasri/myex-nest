import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.findAll(email);
  }

  // take the service and inject it into the controller
  constructor(private usersService: UsersService) {}
  // create a new user
  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body.name, body.email, body.password);
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.usersService.findOneBy(parseInt(id));
  }

  // update a user
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: Partial<CreateUserDto>) {
    return this.usersService.update(parseInt(id), body)
  }

  @Delete("/:id")
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }


}
