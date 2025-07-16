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
        name: 'Home',
      },
      {
        path: 'page1',
        component: () => import('@/views/page1/index.vue'),
        name: 'Page1',
      },
      {
        path: 'page2',
        component: () => import('@/views/page2/index.vue'),
        name: 'Page2',
      },
      {
        path: 'page3',
        component: () => import('@/views/page3/index.vue'),
        name: 'Page3',
      },
      {
        path: 'icons',
        component: () => import('@/views/icons/index.vue'),
        name: 'Icons',
        meta: {
          title: '图标展示',
        },
      },
      // 在这里可以添加更多需要主布局的页面
    ],
  },

  // 使用简单布局的路由（用于登录页面等）
  {
    path: '/auth',
    component: SimpleLayout,
    name: 'Auth',
    children: [
      {
        path: 'login',
        component: () => import('@/views/auth/login.vue'),
        name: 'Login',
        meta: {
          close: 'exit',
        },
      },
    ],
  },
];

export default basicRoutes;
