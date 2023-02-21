import { DirExecuter } from './commands/dir/dir.executor';
import {ConsoleLogger} from "./out/console_logger/console_logger";

export class App {
    async run() {
        new DirExecuter(ConsoleLogger.getInstance()).execute();
    }
}