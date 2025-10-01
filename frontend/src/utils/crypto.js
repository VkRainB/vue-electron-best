

/**
 * 登录 - 加密
 */
export function compileEncode(code) {
  if (!code || typeof code !== 'string') {
    throw new Error('输入必须是非空字符串');
  }
  let c = String.fromCharCode(code.charCodeAt(0) + code.length);
  for (let i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
  }
  return encodeURIComponent(c);
}
/**
 * 登录 - 解密
 */
export function compileDecode(code) {
  if (!code || typeof code !== 'string') {
    throw new Error('输入必须是非空字符串');
  }
  code = decodeURIComponent(code);
  let c = String.fromCharCode(code.charCodeAt(0) - code.length);
  for (let i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
  }
  return c;
}

export function _decodeURIComponent(value) {
  try {
    return decodeURIComponent(value);
  } catch (err) {
    return value;
  }
}
