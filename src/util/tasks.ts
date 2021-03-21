import Listr, {ListrContext} from 'listr'
import execa from 'execa'

import {Application} from '@lib'

const installOrUpdateHomebrewTasks = [
  {
    title: 'Checking if homebrew is already insatlled',
    enabled: () => process.platform === 'darwin',
    task: (ctx: ListrContext) =>
      execa.command('homebrew help').then(result => {
        if (result.stdout !== '') {
          ctx.homebrew = true
        }
      }),
  },
  {
    title: 'Installing homebrew',
    enabled: (ctx: ListrContext) =>
      process.platform === 'darwin' && !ctx.homebrew,
    task: () =>
      execa.command(
        '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'
      ),
  },
]

export const installYarnTasks = [
  {
    title: 'Install Yarn',
    task: () =>
      new Listr([
        {
          title: 'Check if Yarn is already installed',
          task: (ctx: ListrContext) =>
            execa.command('which yarn').then(result => {
              if (result.stdout !== '') {
                ctx.yarn = true
              }
            }),
        },
        {
          title: 'Install Yarn since not found on system',
          enabled: (ctx: ListrContext) => !ctx.yarn,
          task: () => new Listr(installOrUpdateHomebrewTasks),
        },
      ]),
  },
]

export const installNodeTasks = [
  {
    title: 'Install Node via nvm',
    task: () =>
      new Listr([
        {
          title: 'Check if nvm is already installed',
          task: (ctx: ListrContext, task) =>
            execa.command('command -v nvm').then(result => {
              if (result.stdout !== '') {
                ctx.nvm = true
              }
            }).catch(e => {
              console.log(e)
              task.skip('nvm not found') // todo: this is breaking rn
            }),
        },
        // {
        //   title: 'Install nvm since not found on system',
        //   enabled: (ctx: ListrContext) => !ctx.nvm,
        //   task: () => execa.command('curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash'),
        // },
      ]),
  },
]

export function validateGitRepoTask(app: Application) {
  return {
    title: 'Confirm proper project directory',
    task: () =>
      execa.command('git rev-parse --show-toplevel').then(result => {
        if (!result.stdout.includes(`notarize-${app}`)) {
          throw new Error(
            'Unclean working tree. Commit or stash changes first.'
          )
        }
      }),
  }
}
