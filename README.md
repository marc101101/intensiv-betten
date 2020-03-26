# ContiCloud Data Collection Service

This is a data collection service of the Continental Cloud team. This service is based on AWS lambda and collectes data from different data sources.

Currently following sources are supported:

* [Opsgenie](./docu/README_Opsgenie.md)

Currently following further data sources are planned to be supported in the future:

* AWS Billing
* Service Uptimes

## Installation

You can compile the ts files in this directory by 1st installing typescript via

```bash
npm install
```

## Development

The project is built with `make`.

### Information about the make targets

```bash
make help
```

### Playground

Docker is used for build environment.

```bash
make bash
```

### Debugging

Here VSCode Debugging by invoking the AWS lambda locally with the serverless framwork (see ./vscode).

## ToDo
All todos can be found [here](TODO.md).