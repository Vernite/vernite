const core = require('@actions/core');
const github = require('@actions/github');

const successMark = '<svg width="14" height="14" class="octicon octicon-check-circle-fill color-fg-success" aria-label="completed successfully" viewBox="0 0 16 16" version="1.1" role="img"><path fill="#3FB950" fill-rule="evenodd" d="M8 16A8 8 0 108 0a8 8 0 000 16zm3.78-9.72a.75.75 0 00-1.06-1.06L6.75 9.19 5.28 7.72a.75.75 0 00-1.06 1.06l2 2a.75.75 0 001.06 0l4.5-4.5z"></path></svg>';

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
    .addLink('View staging deployment!', 'https://github.com')
    .write();
})();
