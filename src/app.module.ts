import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeilisearchModule } from './meilisearch/meilisearch.module';
import { SensorController } from './sensor.controller';
import { SensorService } from './sensor.service';
import { MeiliController } from './meili.controller';

@Module({
  imports: [
    MeilisearchModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        host: configService.getOrThrow('MEILI_HOST'),
        token: configService.getOrThrow('MEILI_TOKEN'),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        database: configService.getOrThrow('DB_DATABASE'),
        name: 'dpa',
        host: configService.getOrThrow('DB_HOST'),
        password: configService.getOrThrow('DB_PASSWORD'),
        username: configService.getOrThrow('DB_USER'),
        port: configService.getOrThrow('DB_PORT'),
      }),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [SensorController, MeiliController],
  providers: [SensorService],
})
export class AppModule {}
