# electron-template

20.19.0 新增的特性 require(esm) 恰好允许用 CJS 加载器去加载 ESM，于是 Node 不再抛 ERR_REQUIRE_ESM
所以你应该使用这个否则你需要将electron.vite.config.js改为electron.vite.config.mjs 文件后

An Electron application with Vue

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Project Setup

### Install

```bash
$ pnpm install
```

### Development

```bash
$ pnpm dev
```

### Build

```bash
# For windows
$ pnpm build:win

# For macOS
$ pnpm build:mac

# For Linux
$ pnpm build:linux
```
