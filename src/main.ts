import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme } from 'swagger-themes';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('Meili consumer')
    .setVersion('1.0')
    .build();

  const theme = new SwaggerTheme('v3');

  const options = {
    explorer: true,
    customCss: theme.getBuffer('dark'),
  };

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, options);

  const port = configService.getOrThrow('PORT');

  await app.listen(port, () => logger.debug(`App listening on port ${port}`));
}
bootstrap();
