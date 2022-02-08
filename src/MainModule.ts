import { Module } from '@nestjs/common';
import { DispatcherModule } from 'dispatcher';

@Module({
  imports: [DispatcherModule],
})
export class MainModule {
}