import path, { resolve } from 'node:path';
import process from 'node:process';

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

const root = resolve(process.cwd(), '.', 'frontend');

export default function createSvgIcon(isBuild) {
  return createSvgIconsPlugin({
    iconDirs: [path.join(root, 'src/assets/svg')],
    symbolId: 'svg-[dir]-[name]',
    svgoOptions: isBuild,
  });
}
