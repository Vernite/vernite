import { readdir } from 'fs/promises';
import { lstatSync } from 'fs';
import path from 'path';

const findFiles = async (dir, fileName, options) => {
  dir = path.resolve(process.cwd(), dir);

  const directoriesToOmit = options?.omit || [];
  let matchedFiles = [];

  const files = await readdir(dir);

  for (const file of files) {
    const pathToFile = path.resolve(dir, file);

    if (directoriesToOmit.includes(file)) continue;

    if (lstatSync(pathToFile).isDirectory()) {
      matchedFiles = [].concat(matchedFiles, await findFiles(pathToFile, fileName, options))
    } else {
      if (file == fileName) {
        matchedFiles.push(pathToFile);
      }
    }
  }

  return matchedFiles;
};

const files = await findFiles('.', 'lcov.info', {
  omit: ['node_modules', 'maven_repository']
});

console.log(JSON.stringify(files))
