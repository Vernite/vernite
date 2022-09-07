/* eslint-disable */
let { makeBadge, Format } = require('badge-maker');
const testsCoverageSummary = require('../coverage/workflow/coverage-summary.json');
const testsResults = require('../coverage/karma-result.json');
const docsSummary = require('../documentation.json');
const { readFileSync, writeFileSync, existsSync, mkdirSync } = require('fs');

const createBadge = makeBadge;
makeBadge = (format) => {
  console.log(`Generating badge for:`);
  console.dir(format);
  const badge = createBadge(format);
  return badge;
}

const colorFromCoverage = (coverage) => {
  if (coverage < 50) {
    return 'red';
  }
  if (coverage < 75) {
    return 'yellow';
  }
  return 'green';
};

const getDocumentationCoverage = () => {
  return Number(docsSummary.coverage.count);
};

const getTestsCoverage = () => {
  return testsCoverageSummary.total.lines.pct;
};

const getTestsResults = () => {
  return Number(testsResults.summary.failed) > 0 ? 0 : 100;
};

if (!existsSync('./dist')) mkdirSync('./dist');
if (!existsSync('./dist/workflow')) mkdirSync('./dist/workflow');
if (!existsSync('./dist/workflow/badges')) mkdirSync('./dist/workflow/badges');

writeFileSync(
  './dist/workflow/badges/badge-coverage.svg',
  makeBadge({
    label: 'coverage',
    color: colorFromCoverage(getTestsCoverage()),
    message: `${getTestsCoverage()}%`,
  }),
);

writeFileSync(
  './dist/workflow/badges/badge-documentation.svg',
  makeBadge({
    label: 'documentation',
    color: colorFromCoverage(getDocumentationCoverage()),
    message: `${getDocumentationCoverage()}%`,
  }),
);

writeFileSync(
  './dist/workflow/badges/badge-tests-result.svg',
  makeBadge({
    label: 'tests',
    color: colorFromCoverage(getTestsResults()),
    message: `${getTestsResults() ? 'passed' : 'failed'}`,
  }),
);
