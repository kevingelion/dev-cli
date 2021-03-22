"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGitRepoTask = exports.checkCleanRepoTasks = exports.installNodeTasks = exports.installYarnTasks = void 0;
const tslib_1 = require("tslib");
const fs_1 = require("fs");
const os_1 = require("os");
const listr_1 = tslib_1.__importDefault(require("listr"));
const execa_1 = tslib_1.__importDefault(require("execa"));
const installOrUpdateHomebrewTasks = [
    {
        title: 'Checking if homebrew is already insatlled',
        enabled: () => process.platform === 'darwin',
        task: (ctx, task) => execa_1.default.command('homebrew help').then(result => {
            if (result.stdout !== '') {
                ctx.homebrew = true;
            }
        }).catch(() => {
            task.skip('homebrew not installed');
        }),
    },
    {
        title: 'Installing homebrew',
        enabled: (ctx) => process.platform === 'darwin' && !ctx.homebrew,
        task: () => execa_1.default.command('bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'),
    },
];
exports.installYarnTasks = [
    {
        title: 'Install Yarn',
        task: () => new listr_1.default([
            {
                title: 'Check if yarn is already installed',
                task: (ctx) => execa_1.default.command('which yarn').then(result => {
                    if (result.stdout !== '') {
                        ctx.yarn = true;
                    }
                }),
            },
            {
                title: 'Install yarn since not found on system',
                enabled: (ctx) => !ctx.yarn,
                task: () => new listr_1.default(installOrUpdateHomebrewTasks),
            },
        ]),
    },
];
exports.installNodeTasks = [
    {
        title: 'Install Node via nvm',
        task: () => new listr_1.default([
            {
                title: 'Check if nvm is already installed',
                task: (ctx) => {
                    return new Promise(resolve => {
                        if (fs_1.existsSync(`${os_1.homedir()}/.nvm`)) {
                            ctx.nvm = true;
                            resolve(null);
                        }
                    });
                },
            },
            {
                title: 'Install nvm since not found on system',
                enabled: (ctx) => !ctx.nvm,
                task: () => execa_1.default('curl', ['https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh']).then(({ stdout }) => {
                    const bash = execa_1.default('bash');
                    bash.stdin.write(stdout);
                    bash.stdin.end();
                    return bash;
                }),
            },
        ]),
    },
];
exports.checkCleanRepoTasks = [
    {
        title: 'Checking git status',
        task: () => execa_1.default('git', ['status', '--porcelain']).then(({ stdout }) => {
            if (stdout !== '') {
                throw new Error('Unclean working tree... commit or stash changes first');
            }
        }),
    },
    {
        title: 'Checking remote history',
        task: () => execa_1.default('git', ['rev-list', '--count', '--left-only', '@{u}...HEAD']).then(({ stdout }) => {
            if (stdout !== '0') {
                throw new Error('Remote history differ... please pull changes');
            }
        }),
    },
];
function validateGitRepoTask(app) {
    return {
        title: 'Confirm proper project directory',
        task: () => execa_1.default.command('git rev-parse --show-toplevel').then(result => {
            if (!result.stdout.includes(`notarize-${app}`)) {
                throw new Error('Unclean working tree. Commit or stash changes first.');
            }
        }),
    };
}
exports.validateGitRepoTask = validateGitRepoTask;
