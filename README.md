# app-name

Electron + Vite + Vue3 跨平台桌面应用模板。内置多平台打包、自动更新、GitHub Actions CI/CD，开箱即用。

- Node ≥ 20.19
- 包管理器：pnpm（推荐）或 npm
- 平台：Windows / macOS / Linux

## 特性
- 渲染端：Vite + Vue3 + Element Plus + UnoCSS
- 主进程/预加载：electron-vite 分离构建
- 打包：electron-builder（Win NSIS、macOS DMG、Linux AppImage/Deb）
- 自动更新：electron-updater（默认 generic，可切换 GitHub）
- CI/CD：按 tag 构建发布（build.yml）、按分支部署渲染端（deploy.yml）
- 规范：ESLint + Prettier + Commitizen

## 目录结构
```
.
├─ electron/                 # 主进程 & 预加载
│  ├─ main/
│  └─ preload/
├─ frontend/                 # 渲染进程（Vite）
│  ├─ src/
│  └─ index.html
├─ config/
│  ├─ electron-builder.config.js
│  └─ updater.config.json
├─ resources/                # 安装器/图标资源
├─ .github/workflows/
│  ├─ build.yml              # 按 tag 构建并发布 Release
│  └─ deploy.yml             # 部署渲染端静态资源
├─ electron.vite.config.js
├─ package.json
└─ README.md
```

## 快速开始
1. 安装依赖
   ```bash
   pnpm install
   # 或
   npm install
   ```

2. 开发调试
   ```bash
   pnpm dev
   # 或
   npm run dev
   ```

3. 本地构建与预览
   ```bash
   pnpm build
   pnpm start
   # 或
   npm run build
   npm start
   ```

## 脚本
```bash
pnpm dev                  # 开发（electron-vite dev）
pnpm build                # 构建 out/main、out/preload、out/renderer
pnpm build:win            # Windows 安装包（输出至 build/）
pnpm build:mac            # macOS 安装包（支持 --universal）
pnpm build:linux          # Linux 安装包（AppImage/Deb 等）
pnpm build:electron       # 仅执行 electron-builder
pnpm build:zip            # 生成增量更新压缩包（示例）
```

说明：
- electron-vite 输出到 `out/`；electron-builder 输出到 `build/`（见 `config/electron-builder.config.js`）。
- 可通过环境变量 `ELECTRON_BUILDER_EXTRA_ARGS` 传递额外参数（如 `--publish=never`、`--universal`）。

## 配置要点
- 别名：`@ -> frontend/src`（见 `electron.vite.config.js`）
- 图标与安装器资源：`resources/`
- 自动更新：
  - 默认 `publish: generic`，需自建更新服务器（托管 `latest.yml`、`*.blockmap`、安装包）
  - 若使用 GitHub Releases，改为 `publish: github` 并在 CI 上传产物

## CI/CD（GitHub Actions）
- `.github/workflows/build.yml`（触发：推送 tag，格式 `v*`）
  - Node 20 + pnpm 安装依赖
  - 三平台矩阵构建；Linux 安装 `GTK/WebKit/patchelf/libfuse2/xz-utils/rpm/libarchive-tools` 等依赖
  - 从 tag 解析版本并读取 tag message 作为 Release 说明
  - 上传 `build/` 产物到 GitHub Release
  - 如启用 `snap` 目标，需：
    - 安装 `snapcraft`
    - 在 Secrets 配置 `SNAPCRAFT_STORE_CREDENTIALS`，并在 Job 中导出
  - 若无需 `snap`，将 `config/electron-builder.config.js` 中 Linux 目标改为 `['AppImage', 'deb']`

- `.github/workflows/deploy.yml`（触发：推送 main 或手动）
  - 写入 `frontend/.env.production.local`（从 Secrets 注入）
  - 构建渲染端到 `out/renderer/`
  - 通过 `appleboy/scp-action`、`ssh-action` 部署到服务器目录

## 常见问题
- 路由/导入大小写导致找不到文件
  - Linux/CI 区分大小写。请保证导入路径与真实文件名大小写一致（如 `@/views/auth/Login.vue`）。
  - 若需更改目录大小写：`git config core.ignorecase false`，用两步 `git mv` 重命名，让 Git 记录大小写变更。
- Linux CI 报 `app-builder ... CANNOT_EXECUTE`
  - 确保安装依赖：`libgtk-3-dev webkit2gtk-4.0 libappindicator3-dev librsvg2-dev patchelf libfuse2 xz-utils rpm libarchive-tools`
  - 兜底修复执行位：`find node_modules -type f -name app-builder -exec chmod +x {} +`
- Snapcraft 认证问题（打 snap 包）
  - 在本机执行 `snapcraft export-login -`，将结果保存到 Secrets `SNAPCRAFT_STORE_CREDENTIALS`
  - 在 CI 中 `export SNAPCRAFT_STORE_CREDENTIALS` 后再构建
- macOS Runner 排队时间长
  - 高峰期排队严重。可先仅跑 Windows/Linux 验证流程，或条件触发 macOS，或使用自托管/付费配额。

## 许可证
MIT
