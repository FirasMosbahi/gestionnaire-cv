import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { CreateSkillDto } from '../dto/create-skill.dto';
import { Cv } from "../../cv/entities/cv.entity";

@Entity('skill')
export class Skill {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  designation: string;
  @ManyToMany(
    type => Cv
  )
  cvs : Array<Cv>;
  constructor(designation: string) {
    this.designation = designation;
  }
  static createFromDto(createSkillDto: CreateSkillDto) {
    return new Skill(createSkillDto.designation);
  }
}
