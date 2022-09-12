/**
 * This file generates i18n coverage / percentage report
 */

/* eslint-disable */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import chalk from 'chalk';

const __filename = fileURLToPath(new URL(import.meta.url));

const PATH_TO_CONFIG = './.ngI18nconfig';
const PATH_TO_LOCALES = './src/locales/';
const EXPORT_FILENAME = 'i18n-report.json';

const EXPORT_TO_JSON = process.argv.includes('--json');

const rawConfig = readFileSync(PATH_TO_CONFIG, 'utf8');
const config = JSON.parse(rawConfig);

const result = {};

function parseXLFFile(filename) {
  const localeFile = readFileSync(
    path.join(PATH_TO_LOCALES, `${filename}.xlf`),
    'utf8'
  );

  let ids = localeFile.match(/(?<=id=")([0-9]*)(?=")/g);
  if (!ids) ids = [];
  return { ids };
}

function overlappingItemsCount(arr1, arr2) {
  return arr1.filter(item => arr2.includes(item)).length;
}

function getColorFromPercentage(percentage) {
  if (percentage >= 90) return chalk.green;
  if (percentage >= 70) return chalk.yellow;
  return chalk.red;
}

function exportResultToJson(result) {
  const filePath = path.resolve(path.basename(__filename), '..', EXPORT_FILENAME);
  const json = JSON.stringify(result, null, 2);
  writeFileSync(filePath, json);
}

const targetResult = parseXLFFile('messages');

for (const locale of config.locales) {
  let localResult = parseXLFFile(`messages.${locale}`);
  let percentage = Math.round(overlappingItemsCount(targetResult.ids, localResult.ids) / targetResult.ids.length * 10000) / 100;
  localResult = { ...localResult, percentage };
  let color = getColorFromPercentage(percentage);

  result[locale] = localResult;

  console.log(`${locale}: ${color(percentage + '%')}`);
}

if (EXPORT_TO_JSON) {
  exportResultToJson(result);
}
