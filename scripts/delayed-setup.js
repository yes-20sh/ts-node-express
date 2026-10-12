#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const userProjectDir = process.argv[2] || process.env.INIT_CWD || process.cwd();
const packageDir = path.resolve(__dirname, '..');

function setup() {
  if (!userProjectDir || path.resolve(userProjectDir) === packageDir) {
    return;
  }

  const copyFile = (src, dest) => {
    try {
      if (fs.existsSync(src)) {
        fs.writeFileSync(dest, fs.readFileSync(src, 'utf8'), 'utf8');
      }
    } catch (e) { }
  };

  // 1. Copy src folder
  const sourceSrc = path.join(packageDir, 'src');
  const targetSrc = path.join(userProjectDir, 'src');
  if (fs.existsSync(sourceSrc) && !fs.existsSync(targetSrc)) {
    try {
      fs.cpSync(sourceSrc, targetSrc, { recursive: true });
    } catch (e) { }
  }

  // 2. Copy config and template files
  copyFile(path.join(packageDir, 'tsconfig.json'), path.join(userProjectDir, 'tsconfig.json'));
  copyFile(path.join(packageDir, 'templates', 'env'), path.join(userProjectDir, '.env'));
  copyFile(path.join(packageDir, 'templates', 'gitignore'), path.join(userProjectDir, '.gitignore'));
  copyFile(path.join(packageDir, 'templates', 'prettierrc'), path.join(userProjectDir, '.prettierrc'));
  copyFile(path.join(packageDir, 'README.md'), path.join(userProjectDir, 'README.md'));

  // 3. Format and update user's package.json
  const userPackageJsonPath = path.join(userProjectDir, 'package.json');
  try {
    let pkg = {};
    if (fs.existsSync(userPackageJsonPath)) {
      pkg = JSON.parse(fs.readFileSync(userPackageJsonPath, 'utf8'));
    }

    const folderName = path.basename(userProjectDir);
    const projectName = pkg.name && pkg.name !== '' ? pkg.name : folderName;

    const formattedPkg = {
      name: projectName,
      version: pkg.version || '1.0.0',
      description: pkg.description || 'TypeScript Express CRUD API with Database',
      author: pkg.author || 'Yashraj Singh Solanki',
      scripts: Object.assign(
        {
          dev: 'tsx watch src/server.ts',
          build: 'tsc',
          start: 'node dist/server.js',
        },
        pkg.scripts || {}
      ),
      dependencies: Object.assign(
        {
          cors: '^2.8.6',
          dotenv: '^16.4.7',
          express: '^4.21.2',
          mongoose: '^9.11.1',
          morgan: '^1.12.1',
          tsx: '^4.19.3',
        },
        pkg.dependencies || {}
      ),
      devDependencies: Object.assign(
        {
          '@types/cors': '^2.8.19',
          '@types/express': '^5.0.0',
          '@types/morgan': '^1.9.10',
          '@types/node': '^22.10.2',
          prettier: '^3.4.2',
          typescript: '^5.7.2',
        },
        pkg.devDependencies || {}
      ),
    };

    fs.writeFileSync(userPackageJsonPath, JSON.stringify(formattedPkg, null, 2), 'utf8');
  } catch (err) { }
}

const isNow = process.argv.includes('--now');
if (isNow) {
  setup();
} else {
  // Wait 1.5 seconds for npm to release and write its dependencies to package.json
  setTimeout(setup, 1500);
}

module.exports = setup;
