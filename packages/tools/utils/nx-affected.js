import { exec } from 'child_process';

/**
 * @param {*} target 
 * @returns {Promise<{ projects: string[] }>}
 */
export function nxAffected(target) {
  let command = `nx print-affected`;

  if (target) {
    command += ` --target=${target}`;
  }
  
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      if (stderr) {
        reject(stderr);
      }
      resolve(stdout);
    });
  });
}