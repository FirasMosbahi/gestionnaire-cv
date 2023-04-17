import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CvModule } from './cv/cv.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cv } from './cv/entities/cv.entity';
import { SkillModule } from './skill/skill.module';
import { UserModule } from './user/user.module';
import { Skill } from './skill/entities/skill.entity';
import { User } from './user/entities/user.entity';
import { FakerModule } from './faker/faker.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env['DB_HOST'],
      port: Number.parseInt(process.env['DB_PORT']),
      database: process.env['DB_NAME'],
      username: process.env['DB_USERNAME'],
      password: process.env['DB_PASSWORD'],
      entities: [Cv, Skill, User],
      synchronize: true,
    }),
    CvModule,
    SkillModule,
    UserModule,
    FakerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
