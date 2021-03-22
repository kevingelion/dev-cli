import Listr from 'listr';
import { Application } from '../lib';
export declare const installYarnTasks: {
    title: string;
    task: () => Listr<{
        homebrew: boolean;
    }>;
}[];
export declare const installNodeTasks: {
    title: string;
    task: () => Listr<any>;
}[];
export declare const checkCleanRepoTasks: {
    title: string;
    task: () => Promise<void>;
}[];
export declare function validateGitRepoTask(app: Application): {
    title: string;
    task: () => Promise<void>;
};
