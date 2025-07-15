// 图片引入对象
const modules = import.meta.glob('./**/*.{png,jpg,jpeg,gif}', { eager: true, import: 'default' });

const result = {};
for (const key in modules) {
  const value = modules[key];
  const segs = key
    .replaceAll('.png', '')
    .replaceAll('.jpg', '')
    .replaceAll('.jpeg', '')
    .replaceAll('.gif', '')
    .replaceAll('./', '')
    .split('/');

  let current = result;
  for (let i = 0; i < segs.length; i++) {
    const prop = segs[i];
    if (!current[prop]) {
      current[prop] = {};
    }
    if (i === segs.length - 1) {
      current[prop] = value;
    } else {
      current = current[prop];
    }
  }
}
// console.log('result', result)
export default result;
