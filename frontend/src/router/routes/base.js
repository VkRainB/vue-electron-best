// 导入布局组件
const MainLayout = () => import('@/layouts/MainLayout.vue');
const SimpleLayout = () => import('@/layouts/SimpleLayout.vue');

const basicRoutes = [
  // 使用主布局的路由
  {
    path: '/',
    component: MainLayout,
    redirect: '/home',
    name: 'MainApp',
    meta: {
      title: '主应用',
    },
    children: [
      {
        path: 'home',
        component: () => import('@/views/Home/Index.vue'),
        name: 'Home',
      },
      {
        path: 'icons',
        component: () => import('@/views/Icons/Index.vue'),
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
        component: () => import('@/views/Auth/Login.vue'),
        name: 'Login',
      },
    ],
  },
];

export default basicRoutes;
