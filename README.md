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
$ notarize COMMAND
running command...
$ notarize (-v|--version|version)
notarize/0.0.0 linux-x64 node-v14.15.0
$ notarize --help [COMMAND]
USAGE
  $ notarize COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`notarize help [COMMAND]`](#notarize-help-command)
* [`notarize setup APPLICATION`](#notarize-setup-application)

## `notarize help [COMMAND]`

display help for notarize

```
USAGE
  $ notarize help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `notarize setup APPLICATION`

sets up dependencies for the specified Notarize application/project

```
USAGE
  $ notarize setup APPLICATION

ARGUMENTS
  APPLICATION  (web|api) name of application to setup

EXAMPLE
  $ notarize setup web
  $ notarize setup api
```

_See code: [dist/commands/setup.ts](https://github.com/repositories/cli/blob/v0.0.0/dist/commands/setup.ts)_
<!-- commandsstop -->
