import pkg from '../../package.json';

/**
 * 转换版本数据格式 (将元组转换为对象)
 * @param {[string, string]} tuple - 依赖包名称和版本的元组
 * @returns {{name: string, version: string}} 标准化格式的依赖包信息
 */
function transformVersionData(tuple) {
  const [name, version] = tuple;
  return { name, version };
}

/**
 * 处理后的 package.json 主要信息
 * @typedef {object} PkgJson
 * @property {string} name - 包名称
 * @property {string} version - 包版本
 * @property {{[key: string]: string}} author - 作者信息
 * @property {Array<{name: string, version: string}>} dependencies - 生产依赖列表
 * @property {Array<{name: string, version: string}>} devDependencies - 开发依赖列表
 */

/** @type {PkgJson} */
export const pkgJson = {
  // 包名称
  name: pkg.name,
  // 包版本
  version: pkg.version,
  // 作者信息
  author: pkg.author,
  // 生产依赖
  dependencies: Object.entries(pkg.dependencies).map((item) => transformVersionData(item)),
  // 开发依赖
  devDependencies: Object.entries(pkg.devDependencies).map((item) => transformVersionData(item)),
};
