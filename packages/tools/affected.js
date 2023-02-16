import { execSync } from 'child_process';

// Get the file path and project name from the command line arguments
const [, , projectName] = process.argv;

if (!projectName) {
  console.error('Please specify the file path and project name as command line arguments.');
  process.exit(1);
}

// Run the "nx print-affected" command to check if the file is affected by changes
const command = `nx print-affected`;
const result = JSON.parse(execSync(command, { encoding: 'utf-8' }));

// Check if the file is affected by changes
const isAffected = result.projects.includes(projectName);

if (isAffected) {
  console.log(`true`);
} else {
  console.log(`false`);
}
