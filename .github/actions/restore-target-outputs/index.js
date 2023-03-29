const cache = require('@actions/cache');
const core = require('@actions/core');
const { readFileSync, existsSync } = require('fs');
const { resolve } = require('path');
const { nxAffected } = import('../../../packages/tools/utils/nx-affected');

/**
 * @param {string} project
 * @returns {Promise<{
 *  targets?: { [key: string]: {
 *    outputs?: string[]
 *  } }
 * }>}
 */
async function getProjectNxConfig(project) {
  const packageJSONPath = resolve(__dirname, `../../../packages/${project}/package.json`);
  const projectJSONPath = resolve(__dirname, `../../../packages/${project}/project.json`);

  if (!existsSync(packageJSONPath) && !existsSync(projectJSONPath)) {
    throw new Error(`Project config not found. One of the following should exist:\n ${packageJSONPath}\n ${projectJSONPath}\n`)
  }

  if (existsSync(packageJSONPath)) {
    return JSON.parse(readFileSync(packageJSONPath)).nx;
  } else {
    return JSON.parse(readFileSync(projectJSONPath));
  }
}

function parsePath(path, project) {
  const projectRoot = resolve(__dirname, `../../../packages/${project}/`);
  const workspaceRoot = resolve(__dirname, '../../');

  path = path.replace('{projectRoot}', projectRoot);
  path = path.replace('{workspaceRoot}', workspaceRoot);

  return path;
}

async function run() {
  const configuration = core.getInput('configuration');
  const target = core.getInput('target');
  const os = core.getInput('os');

  const affected = await nxAffected(target);

  for (const project of affected.projects) {
    const key = `${os}-${configuration}-${target}-${project}`;
    const nxConfig = await getProjectNxConfig(project);
    const paths = (nxConfig.targets?.[target]?.outputs || []).map((path) => {
      return parsePath(path, project);
    });

    if (paths.length) {
      await cache.restoreCache(paths, key);

      console.log('Successfully cached paths:');
      console.log(paths.join('\n'));
    } else {
      console.log('No outputs to cache');
    }
  }
}

run();
