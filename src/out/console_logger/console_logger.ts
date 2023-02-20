import {IStreamlogger} from "../../core/handlers/stream_logger";


export class ConsoleLogger implements IStreamlogger {
    private static logger: ConsoleLogger;

    public static getInstance() {
        if (!ConsoleLogger.logger) {
            ConsoleLogger.logger = new ConsoleLogger();
        }
        return ConsoleLogger.logger;
    }

    log(...args: any[]): void {
        console.log(...args);
    }

    error(...args: any[]): void {
        console.log(...args);
    }

    end(): void {
        console.log('Готово');
    }
}