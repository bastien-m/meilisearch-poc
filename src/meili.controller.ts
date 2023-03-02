import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MeilisearchService } from './meilisearch/meilisearch.service';

@ApiTags('meili')
@Controller('meili')
export class MeiliController {
  constructor(private readonly meiliService: MeilisearchService) {}

  @Post(':index')
  createIndex(@Param('index') index: string) {
    return this.meiliService.addIndex(index, 'id');
  }

  @Get('tasks')
  getTasks() {
    return this.meiliService.getTasks();
  }

  @Delete(':index')
  deleteIndex(@Param('index') index: string) {
    this.meiliService.deleteIndex(index);
  }
}
