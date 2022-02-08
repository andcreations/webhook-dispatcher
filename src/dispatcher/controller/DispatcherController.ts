import { Controller, Param, Headers, Body, Get, Post } from '@nestjs/common';
import { DispatcherService } from '../service';

/** */
@Controller()
export class DispatcherController {
  /** */
  constructor(private readonly dispatcherService: DispatcherService) {
  }

  /** */
  @Get('/ping')
  ping(): { message: string } {
    return { message: 'Pong!'};
  }

  /** */
  @Post('/webhook/:token')
  webhook(
    @Param('token') token: string,
    @Headers() headers: { [key: string]: string },
    @Body() body: any,
  ): Promise<void> {
    return this.dispatcherService.dispatch(token, headers, body);
  }
}