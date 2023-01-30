import chalk from 'chalk';

const args = process.argv.slice(2);
const color = (() => {
  for (const arg of args) {
    if (arg.startsWith('--color=')) {
      return chalk[arg.slice(8)];
    }
  }
  return chalk.white;
})();
const message = args.find(arg => !arg.startsWith('--'));

console.log(color(message));
