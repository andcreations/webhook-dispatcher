import { Module } from '@nestjs/common';
import { DispatcherController } from './controller';
import { DispatcherService, LogService } from './service';

/** */
@Module({
  providers: [LogService, DispatcherService],
  controllers: [DispatcherController],
})
export class DispatcherModule {
}