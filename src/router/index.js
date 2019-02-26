import Recommend from '../views/recommend'
import Singer from '../views/singer'
import SingerDetail from "../views/singer/details"
export default [
  {
    path: '/',
    redirect: '/recommend',
    name: '主页'
  },
  {
    path: '/recommend',
    component: Recommend,
  },
  {
    path:'/singer',
    component:Singer,
    children:[{
      path: '/singer/:id',
      component: SingerDetail
    }]
  }
]
