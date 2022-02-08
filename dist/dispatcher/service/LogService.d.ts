export declare type LogData = {
    [key: string]: any;
};
export declare class LogService {
    protected dataToStr(data: LogData): string;
    private log;
    info(msg: string, data?: LogData): void;
}
