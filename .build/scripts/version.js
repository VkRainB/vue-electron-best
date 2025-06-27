const { execSync } = require('node:child_process')
const process = require('node:process')

const arg = process.argv[2] || '1'
// console.log('参数:', process.argv);
let versionType = ''
switch (arg) {
  case '1':
    versionType = 'patch' //  1.0.1 -> 1.0.2
    break
  case '2':
    versionType = 'minor' // 1.0.2 -> 1.1.0
    break
  case '3':
    versionType = 'major' // 1.1.0 -> 2.0.0
    break
  default:
    console.error('参数错误！用法: npm run v -- 1 || npm run v -- 2 || npm run v -- 3')
    process.exit(1)
}

try {
  execSync(`npm --no-git-tag-version version ${versionType}`, { stdio: 'inherit' })
}
catch (err) {
  console.error('执行 npm version 失败:', err.message)
  process.exit(1)
}
