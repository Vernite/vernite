import { readdirSync, existsSync } from 'fs';
import { throwError } from './utils/console.js';
import { execSync } from 'child_process';
import chalk from 'chalk';

const projects = readdirSync('packages').filter((project) => !project.startsWith('.'));

const version = process.argv.find((arg) => arg.startsWith('--version='))?.split('=')[1] || null;

if (!version) {
  throwError('Please specify the version as a command line argument. Example: --version=1.0.0');
}

for (const project of projects) {
  for (const fileFormat of ['package.json', 'pom.xml']) {
    const file = `packages/${project}/${fileFormat}`;

    if (existsSync(file)) {
      console.log(chalk.dim(`Updating version in file "${file}" to "${version}".`));
      execSync(
        `node packages/tools/version.js --file=${file} --file-format=${fileFormat} --version=${version}`,
      );
    }
  }
}
