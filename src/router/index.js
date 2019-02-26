import Recommend from '../views/recommend'
import RecommendDetail from '../views/recommend/details'
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
    children:[{
      path:'/recommend/:id',
      component:RecommendDetail
    }]
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
