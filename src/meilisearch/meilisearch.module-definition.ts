import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface MeilisearchOptions {
  host: string;
  token: string;
}

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<MeilisearchOptions>({
    moduleName: 'Meili',
  })
    .setClassMethodName('forRoot')
    .build();
