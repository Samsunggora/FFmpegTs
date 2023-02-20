import { ChildProcessWithoutNullStreams } from 'child_process';

import { ICommandExec } from './command.types';
import {IStreamlogger} from "../handlers/stream_logger";

export abstract class CommandExecutor<Input> {
    constructor(private logger: IStreamlogger) { }

    public async execute() {
        const input = await this.prompt();
        const command = this.build(input);
        const stream = this.spawn(command);
        this.processStream(stream, this.logger);
    }

    protected abstract prompt(): Promise<Input>;
    protected abstract build(input: Input): ICommandExec;
    protected abstract spawn(command: ICommandExec): ChildProcessWithoutNullStreams;
    protected abstract processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamlogger): void;
}