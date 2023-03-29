const github = require('@actions/github');

const octokit = github.getOctokit();

console.log(octokit);
