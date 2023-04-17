import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.save(User.createFromDto(createUserDto));
  }

  async findAll(): Promise<Array<User>> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    let updates = {};
    for (const key in updateUserDto) {
      if (updateUserDto[key] !== null) {
        updates = { key: updateUserDto['key'], ...updates };
      }
    }
    return await this.userRepository.update({ id }, updates);
  }

  async remove(id: string) {
    return await this.userRepository.delete(id);
  }
}
