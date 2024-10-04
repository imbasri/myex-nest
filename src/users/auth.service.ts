import { UsersService } from './users.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { randomBytes,scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';


const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(private UsersService: UsersService) {}

  async register(name: string, email: string, password: string) {
    // check if user exists di database
    const users = await this.UsersService.find(email);
    if (users.length) {
      throw new BadRequestException('User already exists');
    }
    // hash password
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 64)) as Buffer;
    const hashedPassword = salt + '.' + hash.toString('hex');

    // save user to the database
    const user = await this.UsersService.create(name, email, hashedPassword);
    return user
  }

  async login(email: string, password: string) {

    const [user] = await this.UsersService.find(email);
    if (!user){
      throw new NotFoundException('User not found');
    }

    const [salt,storeHash] = user.password.split('.');
    console.log('🚀 ~ AuthService ~ login ~ storeHash:', storeHash)
    console.log('🚀 ~ AuthService ~ login ~ salt:', salt)

    const hash = (await scrypt(password, salt, 64)) as Buffer;
    if (storeHash !== hash.toString('hex')) {
      throw new BadRequestException('Wrong password');
    }
    return user
  }

}
