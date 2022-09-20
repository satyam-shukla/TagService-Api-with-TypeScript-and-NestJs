import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigService } from './shared/services/config.service';
import { SharedModule } from './shared/shared.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [TagModule,TypeOrmModule.forRootAsync({
    imports: [SharedModule],
    useFactory: (appConfigService: AppConfigService) => appConfigService.sqlConfig,
    inject: [AppConfigService]
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
