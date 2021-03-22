dev-cli
========

CLI to help start various Notarize development services

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/notarize.svg)](https://npmjs.org/package/notarize)
[![CircleCI](https://circleci.com/gh/repositories/cli/tree/master.svg?style=shield)](https://circleci.com/gh/repositories/cli/tree/master)
[![Codecov](https://codecov.io/gh/repositories/cli/branch/master/graph/badge.svg)](https://codecov.io/gh/repositories/cli)
[![Downloads/week](https://img.shields.io/npm/dw/notarize.svg)](https://npmjs.org/package/notarize)
[![License](https://img.shields.io/npm/l/notarize.svg)](https://github.com/repositories/cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @lclhst/dev-cli
$ notarize-dev COMMAND
running command...
$ notarize-dev (-v|--version|version)
@lclhst/dev-cli/0.1.0 darwin-x64 node-v14.15.0
$ notarize-dev --help [COMMAND]
USAGE
  $ notarize-dev COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`notarize-dev help [COMMAND]`](#notarize-dev-help-command)
* [`notarize-dev web SUBCOMMAND`](#notarize-dev-web-subcommand)

## `notarize-dev help [COMMAND]`

display help for notarize-dev

```
USAGE
  $ notarize-dev help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `notarize-dev web SUBCOMMAND`

Helper commands for running inside the Notarize web project

```
USAGE
  $ notarize-dev web SUBCOMMAND

ARGUMENTS
  SUBCOMMAND  (setup) subcommand

EXAMPLE
  $ notarize-dev web setup
```

_See code: [src/commands/web.ts](https://github.com/kevingelion/dev-cli/blob/v0.1.0/src/commands/web.ts)_
<!-- commandsstop -->
