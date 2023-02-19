const core = require('@actions/core');
const github = require('@actions/github');

core.notice('This is notice');

(async () => {
  await core.summary
    .addHeading('Test Results')
    .addCodeBlock(generateTestResults(), "js")
    .addTable([
      [{ data: 'File', header: true }, { data: 'Result', header: true }],
      ['foo.js', 'Pass '],
      ['bar.js', 'Fail '],
      ['test.js', 'Pass ']
    ])
    .addLink('View staging deployment!', 'https://github.com')
    .write();
})();
