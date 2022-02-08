import { DispatcherService } from '../service';
export declare class DispatcherController {
    private readonly dispatcherService;
    constructor(dispatcherService: DispatcherService);
    ping(): {
        message: string;
    };
    webhook(token: string, headers: {
        [key: string]: string;
    }, body: any): Promise<void>;
}
