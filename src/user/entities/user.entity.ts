import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { Cv } from '../../cv/entities/cv.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  username: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @OneToMany((type) => Cv, (cv: Cv) => cv.user, { eager: true, cascade: true })
  cvs: Array<Cv>;
  constructor(
    username: string,
    email: string,
    password: string,
    cvs: Array<Cv>,
  ) {
    this.email = email;
    this.password = password;
    this.username = username;
    this.cvs = cvs;
  }
  static createFromDto(createUserDto: CreateUserDto) {
    return new User(
      createUserDto.username,
      createUserDto.email,
      createUserDto.password,
      createUserDto.cvs,
    );
  }
}
