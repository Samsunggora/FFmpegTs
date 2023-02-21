import {ChildProcessWithoutNullStreams, spawn} from 'child_process';
import {CommandExecutor} from '../../core/executor/command.executor';
import {FileService} from '../../core/files/file.service';
import {PromptService} from '../../core/prompt/prompt.service';
import {IStreamlogger} from "../../core/handlers/stream_logger";
import {StreamHandler} from "../../core/handlers/stream.hendler";
import {FfmpegBuilder} from "../ffmpeg.builder/ffmpeg.builder";
import {ICommandExecFfmpeg, IFfmpegInput} from "../types/ffmpeg.types";

export class FfmpegExecutor extends CommandExecutor<IFfmpegInput> {
    private fileService: FileService = new FileService();
    private promptService: PromptService = new PromptService();

    constructor(logger: IStreamlogger) {
        super(logger);
    }

    protected async prompt(): Promise<IFfmpegInput> {
        const width = await this.promptService.input<number>('Ширина', 'number');
        const height = await this.promptService.input<number>('Высота', 'number');
        const path = await this.promptService.input<string>('Путь до файла', 'input');
        const name = await this.promptService.input<string>('Имя', 'input');
        return {width, height, path, name};
    }

    protected build({width, height, path, name}: IFfmpegInput): ICommandExecFfmpeg {
        const output = this.fileService.getFilePath(path, name, 'mp4');
        const args = (new FfmpegBuilder())
            .input(path)
            .setVideoSize(width, height)
            .output(output);
        return {command: 'ffmpeg', args, output};
    }

    protected spawn({output, command, args}: ICommandExecFfmpeg): ChildProcessWithoutNullStreams {
        this.fileService.deleteFileIfExists(output);
        return spawn(command, args);
    }

    protected processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamlogger): void {
        const handler = new StreamHandler(logger);
        handler.processOutput(stream);
    }
}