/* eslint-disable */
function requireIfExists(...modules) {
  for (let module of modules) {
    try {
      return require(module);
    } catch (error) {
      // pass and try next file
    }
  }
  throw new Error('None of the provided modules exist.')
}

let { makeBadge } = require('badge-maker');
const testsCoverageSummary = require('../coverage/vernite/coverage-summary.json');
const testsResults = require('../coverage/karma-result.json');
const docsSummary = requireIfExists('../documentation/documentation.json', '../documentation.json');
const { writeFileSync, existsSync, mkdirSync } = require('fs');

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

if (!existsSync('./badges')) mkdirSync('./badges');

writeFileSync(
  './badges/badge-coverage.svg',
  makeBadge({
    label: 'coverage',
    color: colorFromCoverage(getTestsCoverage()),
    message: `${getTestsCoverage()}%`,
  }),
);

writeFileSync(
  './badges/badge-documentation.svg',
  makeBadge({
    label: 'documentation',
    color: colorFromCoverage(getDocumentationCoverage()),
    message: `${getDocumentationCoverage()}%`,
  }),
);

writeFileSync(
  './badges/badge-tests-result.svg',
  makeBadge({
    label: 'tests',
    color: colorFromCoverage(getTestsResults()),
    message: `${getTestsResults() ? 'passed' : 'failed'}`,
  }),
);
