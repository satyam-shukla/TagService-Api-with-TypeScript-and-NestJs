import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule,DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { configSwagger } from './swagger';
import { SharedModule } from './shared/shared.module';
import { AppConfigService } from './shared/services/config.service';
import * as dotenv from 'dotenv';
dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfigService = app.select(SharedModule).get(AppConfigService);
  app.useGlobalPipes(new ValidationPipe())
    const document = SwaggerModule.createDocument(app,configSwagger);
    SwaggerModule.setup('api/docs',app,document)
    await app.listen(process.env.PORT);
}
bootstrap();
