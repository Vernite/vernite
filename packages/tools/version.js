import { existsSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { throwError, throwSuccess } from './utils/console.js';
import { execSync } from 'child_process';

const AVAILABLE_FORMATS = ['package.json', 'pom.xml'];

let fileFormat =
  process.argv.find((arg) => arg.startsWith('--file-format='))?.split('=')[1] || null;

const file = process.argv.find((arg) => arg.startsWith('--file='))?.split('=')[1] || null;

const version = process.argv.find((arg) => arg.startsWith('--version='))?.split('=')[1] || null;

if (!file) {
  throwError(
    'Please specify the file path as a command line argument. Example: --file=package.json',
  );
} else if (!existsSync(file)) {
  throwError(`The file "${file}" does not exist.`);
}

if (!fileFormat) {
  const autoFileFormat = path.basename(file);

  if (!AVAILABLE_FORMATS.includes(fileFormat)) {
    if (!autoFileFormat || !AVAILABLE_FORMATS.includes(autoFileFormat)) {
      throwError(
        `Could not parse file format from filename. Please specify the file format as a command line argument. Example: --file-format=package.json`,
      );
    }

    fileFormat = autoFileFormat;
  }
}

if (!version) {
  throwError('Please specify the version as a command line argument. Example: --version=1.0.0');
}

if (fileFormat === 'package.json') {
  let packageJsonRaw = readFileSync(file, { encoding: 'utf-8' });
  const packageJson = JSON.parse(packageJsonRaw);

  if (!packageJson.version) {
    throwError(
      `Could not find a version in the file "${file}". Please make sure the file contains a version.`,
    );
  }

  packageJsonRaw = packageJsonRaw.replace(
    `"version": "${packageJson.version}"`,
    `"version": "${version}"`,
  );
  writeFileSync(file, packageJsonRaw, { encoding: 'utf-8' });

  throwSuccess(`Updated version in file "${file}" to "${version}".`);
}

if (fileFormat === 'pom.xml') {
  const mvnCommand = `mvn versions:set -DnewVersion="${version}-SNAPSHOT" -f ${file}`;
  execSync(mvnCommand, { stdio: 'inherit' });
}
