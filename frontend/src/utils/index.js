/**
 * 工具函数库入口文件
 * 统一导出项目中实际使用的工具函数
 */

// 导出实际使用的工具函数
// 默认导出
import * as commonUtils from './common';

export * from './common';

export default {
  common: commonUtils,
};
