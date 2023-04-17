import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './entities/skill.entity';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}
  async create(createSkillDto: CreateSkillDto) : Promise<Skill> {
    return await this.skillRepository.save(Skill.createFromDto(createSkillDto));
  }

  async findAll() : Promise<Array<Skill>> {
    return await this.skillRepository.find();
  }

  async findOne(id: string) {
    return await this.skillRepository.findOne({where : {id}});
  }

  async update(id: string, updateSkillDto: UpdateSkillDto) {
    let updates = {};
    for (const key in updateSkillDto) {
      if (updateSkillDto[key] !== null) {
        updates = { key: updateSkillDto['key'], ...updates };
      }
    }
    return await this.skillRepository.update({id},updates);
  }

  async remove(id: string) {
    return await this.skillRepository.delete(id);
  }
}
