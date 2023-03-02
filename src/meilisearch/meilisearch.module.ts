import { Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './meilisearch.module-definition';
import { MeilisearchService } from './meilisearch.service';

@Module({
  providers: [MeilisearchService],
  exports: [MeilisearchService],
})
export class MeilisearchModule extends ConfigurableModuleClass {}
