const core = require('@actions/core');
const github = require('@actions/github');

const successMark = '✅';
const skippedMark = '⏭️';
const failureMark = '❌';

const headerTitles = [
  'Package',
  'Build',
  'Test',
  'Tests passed',
  'Tests failed',
  'Tests skipped',
  'Cache'
];

const data = {
  "packages": {
    "client": {
      "build": {
        "status": "success",
        "fetchedFromCache": false,
      },
      "test": {
        "status": "success",
        "fetchedFromCache": false,
        "tests": {
          "total": 100,
          "passed": 100,
          "failed": 0,
          "skipped": 0,
        },
      },
    },
    "server": {
      "build": {
        "status": "success",
        "fetchedFromCache": false,
      },
      "test": {
        "status": "success",
        "fetchedFromCache": false,
        "tests": {
          "total": 100,
          "passed": 100,
          "failed": 0,
          "skipped": 0,
        },
      },
    },
    "proto": {
      "build": {
        "status": "success",
        "fetchedFromCache": false,
      },
      "test": {
        "status": "success",
        "fetchedFromCache": false,
        "tests": {
          "total": 100,
          "passed": 100,
          "failed": 0,
          "skipped": 0,
        },
      },
    }
  }
};

function getMark(status) {
  if (status === 'success') {
    return successMark;
  } else if (status === 'skipped') {
    return skippedMark;
  } else {
    return failureMark;
  }
}

function generateTableRow(packageName, data) {
  return [
    packageName,
    getMark(data.build.status),
    getMark(data.test.status),
    `${data.test.tests.passed}`,
    `${data.test.tests.failed}`,
    `${data.test.tests.skipped}`,
    data.build.fetchedFromCache ? 'yes' : 'no',
  ]
}

(async () => {
  await core.summary
    .addHeading('Action results')
    .addTable([
      headerTitles.map(title => ({ data: title, header: true })),
      ...Object.entries(data.packages).map(([packageName, data]) => generateTableRow(packageName, data))
    ])
    .write();
})();
