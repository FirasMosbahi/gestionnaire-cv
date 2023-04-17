import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { Cv } from '../cv/entities/cv.entity';
import { Skill } from '../skill/entities/skill.entity';
import {
  randEmail,
  randFilePath,
  randFullName,
  randJobTitle,
  randLastName,
  randNumber,
  randPassword,
  randSkill,
  randUserName,
} from '@ngneat/falso';

@Injectable()
export class FakerService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Cv) private readonly cvRepository: Repository<Cv>,
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}
  generateFakeUser() {
    return new User(randUserName(), randEmail(), randPassword(), [
      new Cv(
        randLastName(),
        randFullName(),
        randNumber(),
        randNumber({ min: 8, max: 8 }),
        randJobTitle(),
        randFilePath(),
        [new Skill(randSkill())],
      ),
    ]);
  }
  async seedDataBase(dataSize: number) {
    const usersToSeed: Array<User> = [];
    for (let i = 0; i < dataSize; i++) {
      usersToSeed.push(this.generateFakeUser());
    }
    await this.userRepository.save(usersToSeed);
  }
}
