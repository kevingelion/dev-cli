import {Command} from '@oclif/command'
import Listr from 'listr'
import execa from 'execa'

import {installNodeTasks, installYarnTasks, checkCleanRepoTasks, validateGitRepoTask} from '../util/tasks'

enum WebCommand {
  Setup = 'setup'
}

const tasks = {
  [WebCommand.Setup]: [
    ...[validateGitRepoTask('notarize-web')],
    {
      title: 'Confirm latest git status',
      task: () => new Listr(checkCleanRepoTasks, {concurrent: true}),
    },
    ...installNodeTasks,
    ...installYarnTasks,
    {
      title: 'Install project dependencies',
      task: () => execa.command('yarn install --frozen-lockfile'),
    },
  ],
}

export default class Setup extends Command {
  static description = 'Helper commands for running inside the Notarize web project'

  static examples = [
    `$ notarize-dev web setup
`,
  ]

  static args = [{
    name: 'subcommand',
    required: true,
    description: 'subcommand',
    options: Object.values(WebCommand),
  }]

  async run<T>() {
    const {args}: { args: { subcommand: WebCommand }} = this.parse(Setup)

    await new Listr(tasks[args.subcommand]).run()
  }
}
