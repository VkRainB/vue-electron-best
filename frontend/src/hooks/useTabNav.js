import router from '@/router';

/**
 * 跳转到录单页面
 * @param {object} [options] - 配置选项
 * @param {string} [options.tagName] - 标签页名称
 * @param {object} [options.query] - 传递的参数
 * @param {string} [options.query.type] - 录单类型
 * @param {string} [options.query.id] - 唯一标识，设置后当个用户只能打开一个录单页面
 */ export const goMakeOrderPage = ({ tagName = '录单', query = {} } = {}) => useTabNav('/makeOrder', tagName, query);

export function useTabNav(path, tagName, query = {}) {
  const { id } = query;
  if (!id) query.id = Date.now();
  query.tagName = tagName || `标签页-${query.id}`;
  router.push({ name: 'tabNav', query: { path, ...query } });
}
