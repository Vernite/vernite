import chalk from 'chalk';

export function throwError(message) {
  console.error(chalk.red(message));
  process.exit(1);
}

export function throwSuccess(message) {
  console.log(chalk.green(message));
  process.exit(0);
}
