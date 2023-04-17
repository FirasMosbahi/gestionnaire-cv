import { Injectable } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cv } from './entities/cv.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(Cv) private readonly cvRepository: Repository<Cv>,
  ) {}
  create(createCvDto: CreateCvDto): Promise<Cv> {
    return this.cvRepository.save(Cv.createFromDto(createCvDto));
  }

  async findAll(): Promise<Array<Cv>> {
    return await this.cvRepository.find();
  }

  async findOne(id: string): Promise<Cv> {
    return await this.cvRepository.findOne({ where: { id } });
  }

  async update(id: string, updateCvDto: UpdateCvDto): Promise<UpdateResult> {
    let updates = {};
    for (const key in updateCvDto) {
      if (updateCvDto[key] !== null) {
        updates = { key: updateCvDto['key'], ...updates };
      }
    }
    return await this.cvRepository.update({ id }, updates);
  }

  async remove(id: string) {
    return await this.cvRepository.delete(id);
  }
}
