#!/usr/bin/env node
const path = require('path');
const { spawn } = require('child_process');

const userProjectDir = process.env.INIT_CWD || process.env.PWD || process.cwd();
const packageDir = path.resolve(__dirname, '..');

if (userProjectDir && path.resolve(userProjectDir) !== packageDir) {
  try {
    // 1. Run initial immediate copy
    const setup = require('./delayed-setup.js');
    setup();

    // 2. Spawn delayed background process to overwrite package.json after npm CLI finishes
    const setupScript = path.join(__dirname, 'delayed-setup.js');
    const child = spawn(process.execPath, [setupScript, userProjectDir], {
      detached: true,
      stdio: 'ignore',
      windowsHide: true,
    });
    child.unref();

    console.log('\x1b[32m%s\x1b[0m', '✔ [@yes20sh/ts-node-express] Created /src, tsconfig.json, .env, .gitignore, .prettierrc!');
    console.log('\x1b[36m%s\x1b[0m', '🚀 Initializing package configuration...');
  } catch (err) {
    console.error('[@yes20sh/ts-node-express] Notice:', err.message);
  }
}
