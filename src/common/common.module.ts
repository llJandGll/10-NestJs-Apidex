import { Global, Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/axios.adapter';

@Global()
@Module({
  providers: [AxiosAdapter],
  exports: [AxiosAdapter],
})
export class CommonModule {}
