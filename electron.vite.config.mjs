import { resolve } from 'node:path';
import { defineConfig, loadEnv } from 'electron-vite';
import { createElectronConfig, createVitePlugins, rendererBuildConfig } from './.build/vite';

function pathResolve(dir) {
  return resolve(__dirname, '.', dir);
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode);
  console.log('环境变量 env -> ', env);
  // const { VITE_PORT } = env

  return {
    main: createElectronConfig('electron/main/index.js'),
    preload: createElectronConfig('electron/preload/index.js'),
    renderer: {
      root: 'frontend',
      publicDir: 'frontend/public',
      server: {
        // port: Number.parseInt(VITE_PORT),
      },
      resolve: {
        alias: {
          '@': pathResolve('frontend/src'),
        },
      },
      plugins: createVitePlugins(),
      build: rendererBuildConfig(),
    },
  };
});
