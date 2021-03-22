import {Command} from '@oclif/command'
import Listr from 'listr'
import execa from 'execa'

import {Application} from '../lib'
import {installNodeTasks, installYarnTasks, checkCleanRepoTasks, validateGitRepoTask} from '../util/tasks'

export default class Setup extends Command {
  static description = 'Sets up dependencies for the specified Notarize application/project'

  static examples = [
    `$ notarize-dev setup web
`,
  ]

  static args = [{
    name: 'application',
    required: true,
    description: 'name of application to setup',
    options: [Application.Web],
  }]

  async run() {
    const {args} = this.parse(Setup)

    // Separate these based on application type
    const tasks = new Listr([
      ...[validateGitRepoTask(args.application as Application)],
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
    ])

    await tasks.run()
  }
}
