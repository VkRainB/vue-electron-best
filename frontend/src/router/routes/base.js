const Layout = () => import('@/layout/Layout.vue')

const basicRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/image-manager',
    name: 'Root',
    meta: {},
    children: [
      {
        path: 'image-manager',
        component: () => import('@/views/ImageManager/Index.vue'),
        name: 'ImageManager',
        meta: {
          title: '图片管理',
          icon: 'Picture',
          noCache: false,
          affix: true
        }
      },
      {
        path: 'settings',
        component: () => import('@/views/Settings/Index.vue'),
        name: 'Settings',
        meta: {
          title: '设置',
          icon: 'Setting',
          noCache: false
        }
      },
      {
        path: 'about',
        component: () => import('@/views/About/Index.vue'),
        name: 'About',
        meta: {
          title: '关于',
          icon: 'InfoFilled',
          noCache: false
        }
      }
    ]
  }
]

export default basicRoutes
