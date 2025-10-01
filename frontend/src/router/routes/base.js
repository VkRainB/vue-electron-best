// 导入布局组件
const MainLayout = () => import('@/layouts/MainLayout.vue');
const SimpleLayout = () => import('@/layouts/SimpleLayout.vue');

const basicRoutes = [
  // 使用主布局的路由
  {
    path: '/',
    component: MainLayout,
    redirect: '/auth/login',
    name: 'MainApp',
    meta: {
      title: '主应用',
    },
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index.vue'),
        name: 'home',
      },
      {
        path: 'settings',
        component: () => import('@/views/settings/index.vue'),
        name: 'settings',
      },
      {
        path: 'icons',
        component: () => import('@/views/icons/index.vue'),
        name: 'icons',
        meta: {
          title: '图标展示',
        },
      },
      {
        path: 'tabNav',
        component: () => import('@/views/tabNav.vue'),
        name: 'tabNav',
      },
      // 在这里可以添加更多需要主布局的页面
    ],
  },

  // 使用简单布局的路由（用于登录页面等）
  {
    path: '/auth',
    component: SimpleLayout,
    name: 'auth',
    children: [
      {
        path: 'login',
        component: () => import('@/views/auth/login.vue'),
        name: 'login',
        meta: {
          close: 'exit',
        },
      },
    ],
  },
];

export default basicRoutes;
