import { Inject, Injectable } from '@nestjs/common';
import MeiliSearch from 'meilisearch';
import { SensorDto } from 'src/sensor.dto';
import {
  MeilisearchOptions,
  MODULE_OPTIONS_TOKEN,
} from './meilisearch.module-definition';

@Injectable()
export class MeilisearchService {
  private _meilisearch: MeiliSearch;

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly options: MeilisearchOptions,
  ) {
    this._meilisearch = new MeiliSearch({
      host: this.options.host,
      apiKey: this.options.token,
    });
  }

  async addIndex(index: string, primaryKey: string) {
    return this._meilisearch.createIndex(index, { primaryKey });
  }

  async addDocument(index: string, document: SensorDto) {
    return this._meilisearch.index(index).addDocuments([document]);
  }

  async search(index: string, search: string) {
    return this._meilisearch.index(index).search(search);
  }

  async deleteIndex(index: string) {
    return this._meilisearch.deleteIndex(index);
  }

  async getTasks() {
    return this._meilisearch.getTasks();
  }
}
