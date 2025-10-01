const pkg = require('../package.json');
// const { execSync } = require('child_process');

const productName = 'app-name';
// 计算哈希值
// const hash = execSync('git log -1 --format=%h', { encoding: 'utf8' }).trim();

const config = {
  appId: 'com.app-name.com',
  productName,
  copyright: `© 2025 ${pkg.author}`,
  asar: true,
  directories: {
    output: 'build',
    buildResources: 'build',
  },
  files: [
    '!src/*',
    '!temp/*',
    '!config/*',
    '!scripts/*',
    '!.build/*',
    '!frontend/*',
    '!electron/*',
    '!electron.vite.config.{js,ts,mjs,cjs}',
    '!{**/.vscode/**,**/.idea/**,**/.cursor/**}',
    '!{.eslintignore,.eslintrc.cjs,eslint.config*,.prettierignore,.prettierrc.*}',
    '!{jsconfig.json,postcss.config.js,tailwind.config.js}',
    '!{dev-app-update.yml,CHANGELOG.md,README.md,stats.html}',
    '!{.env,.env.*,.npmrc,pnpm-lock.yaml}',
  ],
  asarUnpack: ['resources/**'],
  win: {
    icon: 'resources/icon.ico',
    executableName: 'app-name',
    target: ['nsis'],
  },
  nsis: {
    // https://builder.electron.js.cn/app-builder-lib.interface.nsisoptions
    artifactName: `${productName} Setup ${pkg.version}.${'exe'}`,
    // artifactName: `${productName}-${pkg.version}-setup-${hash}.${'exe'}`,
    oneClick: false,
    differentialPackage: true,
    allowToChangeInstallationDirectory: true,
    perMachine: true, // true=默认「所有用户」安装；false=默认「仅当前用户」安装，显示安装模式安装页面
    deleteAppDataOnUninstall: false,
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
    shortcutName: 'app-name',
    uninstallDisplayName: 'app-name',
    allowElevation: true,
    installerIcon: 'resources/icon.ico',
    uninstallerIcon: 'resources/icon.ico',
    installerHeaderIcon: 'resources/icon.ico',
    include: 'resources/build/installer.nsh',
  },
  mac: {
    entitlementsInherit: 'build/entitlements.mac.plist',
    extendInfo: {
      NSCameraUsageDescription: "Application requests access to the device's camera.",
      NSMicrophoneUsageDescription: "Application requests access to the device's microphone.",
      NSDocumentsFolderUsageDescription: "Application requests access to the user's Documents folder.",
      NSDownloadsFolderUsageDescription: "Application requests access to the user's Downloads folder.",
    },
    notarize: false,
  },
  dmg: {
    artifactName: `${pkg.name}-${pkg.version}.dmg`,
  },
  linux: {
    target: ['AppImage', 'deb'],
    maintainer: 'electronjs.org',
    category: 'Utility',
  },
  appImage: {
    artifactName: `${pkg.name}-${pkg.version}.AppImage`,
  },
  publish: [
    {
      provider: 'generic',
      url: 'http://example/update.com',
    },
  ],
  electronDownload: {
    mirror: 'https://npmmirror.com/mirrors/electron/',
  },
};

module.exports = config;
