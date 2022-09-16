import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TagEntity } from './tag/Entities/tag.entity';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [TagModule,TypeOrmModule.forRoot({
    type:"mysql",
    host:"localhost",
    port:3306,
    username:"root",
    password:"satyam@12",
    database:"tagservice",
    entities: [TagEntity],
    synchronize: true,
    migrations:[],
    // migrationsRun:true,
    // logging: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
