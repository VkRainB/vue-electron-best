import { Buffer } from 'node:buffer';
import process from 'node:process';
import log from 'electron-log';
import iconv from 'iconv-lite';
import colors from 'picocolors';

// 文件等级建议-开发:info  -> 生产:warn
// 文件日志配置
log.transports.file.format = '{y}-{m}-{d} {h}:{i}:{s}.{ms} [{level}] {text}';
log.transports.file.level = 'info'; // 'debug' | 'verbose' | 'info' | 'warn' | 'error'从高到低
log.transports.file.maxSize = 10 * 1024 * 1024; // 10MB
log.transports.file.maxFiles = 5;

// 颜色格式化函数
function formatWithColors(level, message) {
  let tag = '';
  if (level === 'info') {
    tag = colors.gray(colors.bold(message));
  } else if (level === 'warn') {
    tag = colors.yellow(colors.bold(message));
  } else if (level === 'error') {
    tag = colors.red(colors.bold(message));
  } else if (level === 'debug') {
    tag = colors.magenta(colors.bold(message));
  } else {
    tag = colors.white(colors.bold(message));
  }
  return `${tag}`;
}
// 控制台日志配置
log.transports.console.writeFn = (options) => {
  const { message } = options;

  // 提取原始消息内容
  const originalMessage = message.data.join(' ') || '';
  const formattedMessage = formatWithColors(message.level, originalMessage);

  if (process.platform === 'win32') {
    try {
      const encoded = iconv.encode(formattedMessage, 'gbk');
      process.stdout.write(Buffer.concat([encoded, Buffer.from('\n')]));
    } catch (e) {
      process.stdout.write(`${e}\n`);
    }
  } else {
    process.stdout.write(`${formattedMessage}\n`);
  }
};
log.transports.console.level = 'debug';
log.transports.console.format = '{y}-{m}-{d} {h}:{i}:{s}.{ms} [{level}] {text}';

log.debug('日志文件路径:', log.transports.file.getFile().path);

export default log;
export const transports = log.transports;
