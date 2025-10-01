import { createRouter, createWebHashHistory } from 'vue-router';
import { useRecordBreadStore } from '@/store/modules/recordBread';
import basicRoutes from './routes/base';

const router = createRouter({
  history: createWebHashHistory(),
  routes: basicRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

// 添加标签页信息
function addTagInfo(to, next) {
  const {
    query: { id, path, tagName },
    query,
  } = to;
  const tabinfo = {
    id,
    path, // 可忽略参数
    tagName,
    query,
  };
  useRecordBreadStore().add(tabinfo);
  return next({ path, query, replace: true });
}

// 添加全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/tabNav') {
    console.log('to', to);
    return addTagInfo(to, next);
  }
  // 标签页选中
  to.meta.isTabPage ? (useRecordBreadStore().activeTab = to.query.id) : (useRecordBreadStore().activeTab = '');

  next();
});

export default router;
