import { watch } from 'fs';
import { exec } from 'child_process';
import chalk from 'chalk';

const args = process.argv;

while (args[0].includes('node') || args[0].endsWith('watch.js')) {
  args.shift();
}

const fileToWatch = args[0];
const command = args[1];

console.log(`Watching for file changes on ${fileToWatch}`);

let fsWait = false;
watch(fileToWatch, (event, filename) => {
  if (filename) {
    if (fsWait) return;
    fsWait = setTimeout(() => {
      fsWait = false;
    }, 100);
    console.log(`${filename} file Changed. Executing: ${chalk.blue(command)}`);
    exec(command, (error, stdout, stderr) => {
      const message = error || stderr || stdout;

      if (message.includes('warning')) {
        console.log(`${chalk.yellow('warning')} ${message}`);
      } else if (message.includes('error')) {
        console.log(`${chalk.red('error')} ${message}`);
      } else {
        console.log(message);
      }
    });
  }
});
