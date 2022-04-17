/* eslint-disable */
const { makeBadge } = require('badge-maker');
const testsCoverageSummary = require('./coverage/workflow/coverage-summary.json');
const testsResults = require('./coverage/karma-result.json');
const { readFileSync, writeFileSync } = require('fs');

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
  const coverage = readFileSync('./documentation/images/coverage-badge-documentation.svg', 'utf8');
  return parseFloat(coverage.match(/(?<=>).*(?=%<)/g)[0]);
};

const getTestsCoverage = () => {
  return testsCoverageSummary.total.lines.pct;
};

const getTestsResults = () => {
  return Number(testsResults.summary.failed) > 0 ? 0 : 100;
};

writeFileSync(
  './coverage/badge-coverage.svg',
  makeBadge({
    label: 'coverage',
    color: colorFromCoverage(getTestsCoverage()),
    message: `${getTestsCoverage()}%`,
  }),
);

writeFileSync(
  './coverage/badge-documentation.svg',
  makeBadge({
    label: 'documentation',
    color: colorFromCoverage(getDocumentationCoverage()),
    message: `${getDocumentationCoverage()}%`,
  }),
);

writeFileSync(
  './coverage/badge-tests-result.svg',
  makeBadge({
    label: 'tests',
    color: colorFromCoverage(getTestsResults()),
    message: `${getTestsResults() ? 'passed' : 'failed'}`,
  }),
);
