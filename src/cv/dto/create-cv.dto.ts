import { Skill } from '../../skill/entities/skill.entity';

export class CreateCvDto {
  name: string;
  firstname: string;
  age: number;
  cin: number;
  job: string;
  path: string;
  skills: Array<Skill>;
}
