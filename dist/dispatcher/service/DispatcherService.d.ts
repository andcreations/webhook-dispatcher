import { OnApplicationBootstrap } from '@nestjs/common';
import { LogService } from '.';
export declare class DispatcherService implements OnApplicationBootstrap {
    private readonly log;
    private cfg;
    private axios;
    constructor(log: LogService);
    onApplicationBootstrap(): void;
    private readCfg;
    dispatch(token: string, headers: {
        [key: string]: string;
    }, body: any): Promise<any>;
}
