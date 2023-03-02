import { Injectable } from '@nestjs/common';
import { MeilisearchService } from './meilisearch/meilisearch.service';
import { CreateSensorDto } from './sensor.dto';
import { v4 as uuid } from 'uuid';

const SENSOR_INDEX = 'sensor';

@Injectable()
export class SensorService {
  constructor(private meilisearchService: MeilisearchService) {}

  async search(search: string) {
    return this.meilisearchService.search(SENSOR_INDEX, search);
  }

  async create(sensor: CreateSensorDto) {
    return this.meilisearchService.addDocument(SENSOR_INDEX, {
      id: uuid(),
      ...sensor,
    });
  }
}
