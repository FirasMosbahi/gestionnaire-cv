import { Module } from '@nestjs/common';
import { FakerService } from './faker.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cv } from '../cv/entities/cv.entity';
import { Skill } from '../skill/entities/skill.entity';
import { User } from '../user/entities/user.entity';

@Module({
  providers: [FakerService],
  imports: [TypeOrmModule.forFeature([Cv, Skill, User])],
})
export class FakerModule {}
