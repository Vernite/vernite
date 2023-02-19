const core = require('@actions/core');
const github = require('@actions/github');

const successMark = '✅';

core.notice('This is notice');

(async () => {
  await core.summary
    .addHeading('Test Results')
    .addCodeBlock('console.log("sample code block")', "js")
    .addTable([
      [{ data: 'File', header: true }, { data: 'Result', header: true }],
      [successMark, 'Pass '],
      ['bar.js', 'Fail '],
      ['test.js', 'Pass ']
    ])
    .addDetails('Details', 'This is details')
    .addLink('View staging deployment!', 'https://github.com')
    .write();
})();
