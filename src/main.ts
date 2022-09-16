import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule,DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { configSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
    const document = SwaggerModule.createDocument(app,configSwagger);
    SwaggerModule.setup('api/docs',app,document)
    await app.listen(3000);
}
bootstrap();
