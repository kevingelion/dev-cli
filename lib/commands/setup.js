"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const command_1 = require("@oclif/command");
const listr_1 = tslib_1.__importDefault(require("listr"));
const execa_1 = tslib_1.__importDefault(require("execa"));
const lib_1 = require("../lib");
const tasks_1 = require("../util/tasks");
class Setup extends command_1.Command {
    async run() {
        const { args } = this.parse(Setup);
        const tasks = new listr_1.default([
            ...[tasks_1.validateGitRepoTask(args.application)],
            {
                title: 'Confirm latest git status',
                task: () => new listr_1.default(tasks_1.checkCleanRepoTasks, { concurrent: true }),
            },
            ...tasks_1.installNodeTasks,
            ...tasks_1.installYarnTasks,
            {
                title: 'Install project dependencies',
                task: () => execa_1.default.command('yarn install --frozen-lockfile'),
            },
        ]);
        await tasks.run();
    }
}
exports.default = Setup;
Setup.description = 'Sets up dependencies for the specified Notarize application/project';
Setup.examples = [
    `$ notarize-dev setup web
`,
];
Setup.args = [{
        name: 'application',
        required: true,
        description: 'name of application to setup',
        options: [lib_1.Application.Web],
    }];
