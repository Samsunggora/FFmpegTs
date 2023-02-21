import {ChildProcessWithoutNullStreams} from 'child_process';
import {IStreamlogger} from "./stream_logger";

export class StreamHandler {
    constructor(private logger: IStreamlogger) {
    }

    processOutput(stream: ChildProcessWithoutNullStreams) {
        stream.stdout.on('data', (data: any) => {
            this.logger.log(data.toString());
        });

        stream.stderr.on('data', (data: any) => {
            this.logger.error(data.toString());
        });

        stream.on('close', () => {
            this.logger.end();
        });
    }
}