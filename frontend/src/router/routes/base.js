const basicRoutes = [
  {
    path: '/',
    component: () => import('@/views/Home/Index.vue'),
    name: 'Home',
    meta: {
      title: '空白页'
    }
  }
]

export default basicRoutes
