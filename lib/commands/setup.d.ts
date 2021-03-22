import { Command } from '@oclif/command';
import { Application } from '../lib';
export default class Setup extends Command {
    static description: string;
    static examples: string[];
    static args: {
        name: string;
        required: boolean;
        description: string;
        options: Application[];
    }[];
    run(): Promise<void>;
}
