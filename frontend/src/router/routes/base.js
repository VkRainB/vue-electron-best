const Layout = () => import('@/layout/Layout.vue')

const basicRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    name: 'Home',
    meta: {},
    children: [
      {
        path: 'index',
        component: () => import('@/views/Home/Index.vue'),
        name: 'Index',
        meta: {
          title: '首页',
          noCache: false,
          affix: true
        }
      }
    ]
  }
]

export default basicRoutes
