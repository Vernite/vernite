<h1 align="center">Vernite - Clean and powerful work management app.</h1>

<p align="center">
  <img src="https://vernite.dev/en-US/assets/metadata/logo_with_name.svg" alt="angular-logo" width="120px" height="80px"/>
  <br>
  <i>Vernite is a task management app with multiple independent modules to speed up work.
    <br>tasks / calendar / messages</i>
  <br>
</p>

<p align="center">
  <a href="https://vernite.dev/pl-PL/"><strong>DEVELOPMENT SERVER</strong></a>
  <br>
</p>

<p align="center" style="color:red">
  <img src="https://camo.githubusercontent.com/bb8c978f0a4b62e646273b8a5ea2ef05690184ae23d98109a0fc5cc5f450a6f8/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f616e67756c61722d6c6f76652d626c75653f6c6f676f3d616e67756c617226616e67756c61723d6c6f7665" />
  <img src="https://vernite.github.io/frontend/dev/assets/badges/badge-tests-result.svg" />
  <img src="https://vernite.github.io/frontend/dev/assets/badges/badge-coverage.svg" />
  <img src="https://vernite.github.io/frontend/dev/assets/badges/badge-documentation.svg" />
  <a href="https://codecov.io/gh/Vernite/frontend" >
    <img src="https://codecov.io/gh/Vernite/frontend/branch/master/graph/badge.svg?token=QC0TRNLPL0"/>
  </a>
</p>

<hr>
<p><br/></p>

## Getting started

First, install node.js and npm from [https://nodejs.org/en/](https://nodejs.org/en/). In the second step run command:

It's highly recommended to use `yarn` instead of `npm`.

```
npm install -g yarn
yarn install
```

<p><br/></p>

## Development server

For a dev server run:

```
yarn start
```

Navigate to [http://localhost:4200/](http://localhost:4200/). The app will automatically reload if you change any of the source files.

<p><br/></p>

## Build

To build the project run:

```
yarn build
```

The build artifacts will be stored in the `dist/` directory.

<p><br/></p>

## Running unit tests

To execute the unit tests via `Karma` run:

```
yarn unit:serve
```

<p><br/></p>

## Running end-to-end tests

To execute the end-to-end tests via `Cypress` run:

```
yarn e2e:serve
```

<p><br/></p>

## Building documentation

To build documentation via `storybook` run:

```
yarn docs:serve
```

## API Documentation and repository

Endpoints documentation is shared using the Swagger library [here](https://vernite.dev/api/swagger-ui/index.html#/). The backend repository is located [here](https://github.com/Vernite/backend).

## Recommended Versions

node - `16.13.0`<br>
yarn - `1.22.17`<br>
Angular CLI - `13.2.5`
