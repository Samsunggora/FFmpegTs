export interface IStreamlogger {
    log(...args: any): void;

    error(...args: any): void;

    end(): void;
}