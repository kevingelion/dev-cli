notarize
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
$ npm install -g notarize
$ notarize-dev COMMAND
running command...
$ notarize-dev (-v|--version|version)
notarize/0.0.1 darwin-x64 node-v14.15.0
$ notarize-dev --help [COMMAND]
USAGE
  $ notarize-dev COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`notarize-dev help [COMMAND]`](#notarize-dev-help-command)
* [`notarize-dev setup APPLICATION`](#notarize-dev-setup-application)

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

## `notarize-dev setup APPLICATION`

sets up dependencies for the specified Notarize application/project

```
USAGE
  $ notarize-dev setup APPLICATION

ARGUMENTS
  APPLICATION  (web|api) name of application to setup

EXAMPLE
  $ notarize setup web
  $ notarize setup api
```

_See code: [dist/commands/setup.ts](https://github.com/kevingelion/notarize/blob/v0.0.1/dist/commands/setup.ts)_
<!-- commandsstop -->
