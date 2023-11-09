# credit-card-validator

The monorepo for credit card validation using [Luhn algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm). It contains the [`api`](packages/api/README.md) and [`web`](packages/web/README.md) packages.

## Getting Started
This app is built using [NodeJS 20](https://nodejs.org/en/) and [npm](https://yarnpkg.com/). Please make sure you have them installed before proceeding (Node 16.x and 18.x will also work). [`nvm`](https://github.com/nvm-sh/nvm) is recommeneded for managing NodeJS versions.

### Installation
1. Clone the repo
```bash
git clone https://github.com/thetylerreiff/credit-card-validator.git
# or
gh repo clone thetylerreiff/credit-card-validator
```
2. Install dependencies
```bash
npm install
```

### Available Scripts
- `npm run dev` - Runs the app in the development mode.
- `npm run test` - Launches the test runner and runs all tests 

Alternitivly, you can navigatge to each package diretory and run the scripts from there. There is also npm workspace support so you can run scripts in the respective packages from the root directory. For example, you can run `npm run dev -w api` from the root directory to run the `dev` script in the `api` package. To run the `test` script in the `web` package, you can run `npm run test -w web`.