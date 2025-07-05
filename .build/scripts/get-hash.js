const { execSync } = require('node:child_process');

const hash = execSync('git log -1 --format=%h', { encoding: 'utf8' }).trim();
console.log('----hash---', hash);
