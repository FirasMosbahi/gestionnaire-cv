import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreateCvDto } from '../dto/create-cv.dto';
import { User } from '../../user/entities/user.entity';
import { Skill } from '../../skill/entities/skill.entity';

@Entity('cv')
export class Cv {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  firstname: string;
  @Column()
  age: number;
  @Column()
  cin: number;
  @Column()
  job: string;
  @Column()
  path: string;
  @ManyToOne((type) => User, { cascade: true })
  user: User;
  @ManyToMany((type) => Skill, { cascade: true, eager: true })
  @JoinTable({
    name: 'cv-skill',
    joinColumn: {
      name: 'cv',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'skill',
      referencedColumnName: 'id',
    },
  })
  skills: Array<Skill>;
  constructor(
    name: string,
    firstname: string,
    age: number,
    cin: number,
    job: string,
    path: string,
    skills: Array<Skill>,
  ) {
    this.name = name;
    this.firstname = firstname;
    this.age = age;
    this.cin = cin;
    this.job = job;
    this.path = path;
    this.skills = skills;
  }
  static createFromDto(createCvDto: CreateCvDto) {
    return new Cv(
      createCvDto.name,
      createCvDto.firstname,
      createCvDto.age,
      createCvDto.cin,
      createCvDto.job,
      createCvDto.path,
      createCvDto.skills,
    );
  }
}
