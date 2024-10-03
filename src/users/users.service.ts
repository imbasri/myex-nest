import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  findAll(email: string) {
    return this.userRepository.find({ where: { email } });
  }
  create(name: string, email: string, password: string) {
    // create a new user for instance
    const user = this.userRepository.create({ name, email, password });
    // save to the database
    return this.userRepository.save(user);
  }

  async findOneBy(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOneBy(id);
    Object.assign(user, attrs);
    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOneBy(id);
    return this.userRepository.remove(user);
  }
}
