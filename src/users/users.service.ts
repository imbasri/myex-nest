import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  findAll() {
    return this.userRepository.find();
  }
  create(name: string, email: string, password: string) {
    // create a new user for instance
    const user = this.userRepository.create({ name, email, password });
    // save to the database
    return this.userRepository.save(user);
  }

  findOneBy(id: number) {
    return this.userRepository.findOneBy({ id });
  }
}
