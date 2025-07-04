// 导入布局组件
const MainLayout = () => import('@/layout/MainLayout.vue')
const SimpleLayout = () => import('@/layout/SimpleLayout.vue')
const SidebarLayout = () => import('@/layout/SidebarLayout.vue')

const basicRoutes = [
  // 使用主布局的路由
  {
    path: '/',
    component: MainLayout,
    redirect: '/home',
    name: 'MainApp',
    meta: {
      title: '主应用'
    },
    children: [
      {
        path: 'home',
        component: () => import('@/views/Home/Index.vue'),
        name: 'Home'
      },
      {
        path: 'icons',
        component: () => import('@/views/Icons/Index.vue'),
        name: 'WeUIIcons',
        meta: {
          title: 'WeUI 图标集'
        }
      }
      // 在这里可以添加更多需要主布局的页面
    ]
  },

  // 使用侧边栏布局的路由（用于管理后台等）
  {
    path: '/sidebar',
    component: SidebarLayout,
    redirect: '/sidebar/dashboard',
    name: 'SidebarApp',
    meta: {
      title: '管理后台'
    },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/Sidebar/Dashboard.vue'),
        name: 'Dashboard',
        meta: {
          title: '仪表板'
        }
      },
      {
        path: 'data',
        component: () => import('@/views/Sidebar/DataManagement.vue'),
        name: 'DataManagement',
        meta: {
          title: '数据管理'
        }
      },
      {
        path: 'users',
        component: () => import('@/views/Sidebar/UserManagement.vue'),
        name: 'UserManagement',
        meta: {
          title: '用户管理'
        }
      },
      {
        path: 'settings',
        component: () => import('@/views/Sidebar/Settings.vue'),
        name: 'Settings',
        meta: {
          title: '系统设置'
        }
      },
      {
        path: 'help',
        component: () => import('@/views/Sidebar/Help.vue'),
        name: 'Help',
        meta: {
          title: '帮助中心'
        }
      }
    ]
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
        name: 'Login'
      }
    ]
  }
]

export default basicRoutes
