import { DocumentBuilder } from '@nestjs/swagger';

export const configSwagger = new DocumentBuilder()
.setTitle('Tag Service')
.setDescription('The tag service Api description')
.setVersion('1.0')
.addTag('Tags')
.build();
