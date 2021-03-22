import {existsSync} from 'fs'
import {homedir} from 'os'
import Listr, {ListrContext, ListrTaskWrapper} from 'listr'
import execa from 'execa'

import {Application} from '../lib'

const installOrUpdateHomebrewTasks = [
  {
    title: 'Checking if homebrew is already insatlled',
    enabled: () => process.platform === 'darwin',
    task: (ctx: { homebrew: boolean }, task: ListrTaskWrapper) =>
      execa.command('homebrew help').then(result => {
        if (result.stdout !== '') {
          ctx.homebrew = true
        }
      }).catch(() => {
        task.skip('homebrew not installed')
      }),
  },
  {
    title: 'Installing homebrew',
    enabled: (ctx: ListrContext) =>
      process.platform === 'darwin' && !ctx.homebrew,
    task: () =>
      execa.command(
        'bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"',
      ),
  },
]

export const installYarnTasks = [
  {
    title: 'Install Yarn',
    task: () =>
      new Listr([
        {
          title: 'Check if yarn is already installed',
          task: (ctx: ListrContext) =>
            execa.command('which yarn').then(result => {
              if (result.stdout !== '') {
                ctx.yarn = true
              }
            }),
        },
        {
          title: 'Install yarn since not found on system',
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
          task: (ctx: ListrContext) => {
            return new Promise(resolve => {
              if (existsSync(`${homedir()}/.nvm`)) {
                ctx.nvm = true
                resolve(null)
              }
            })
          },
        },
        {
          title: 'Install nvm since not found on system',
          enabled: (ctx: ListrContext) => !ctx.nvm,
          task: () => execa('curl', ['https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh']).then(({ stdout }) => {
            const bash = execa('bash')
            bash.stdin!.write(stdout)
            bash.stdin!.end()

            return bash
          }),
        },
      ]),
  },
]

export const checkCleanRepoTasks = [
  {
    title: 'Checking git status',
    task: () => execa('git', ['status', '--porcelain']).then(({stdout}) => {
      if (stdout !== '') {
        throw new Error('Unclean working tree... commit or stash changes first')
      }
    }),
  },
  {
    title: 'Checking remote history',
    task: () => execa('git', ['rev-list', '--count', '--left-only', '@{u}...HEAD']).then(({stdout}) => {
      if (stdout !== '0') {
        throw new Error('Remote history differ... please pull changes')
      }
    }),
  },
]

export function validateGitRepoTask(app: Application) {
  return {
    title: 'Confirm proper project directory',
    task: () =>
      execa.command('git rev-parse --show-toplevel').then(result => {
        if (!result.stdout.includes(`notarize-${app}`)) {
          throw new Error(
            'Unclean working tree. Commit or stash changes first.',
          )
        }
      }),
  }
}
