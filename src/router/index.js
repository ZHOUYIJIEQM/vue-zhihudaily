import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const RT = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: () => import('@/views/HomePage'),
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/newsDetail/:id',
      name: 'newsDetail',
      component: () => import('@/views/newsDetail'),
      meta: {
        keepAlive: true,
        // keepAlive: false,
        isBack: false
      }
    },
    {
      path: '/newsDetail/:id/comment',
      name: 'comment',
      component: () => import('@/views/Comment'),
      meta: {
        keepAlive: false
      }
    }
  ],
  scrollBehavior(to, from, savedPosition){
    if(savedPosition){
      return savedPosition;
    }else{
      return {x: 0, y: 0};
    }
  }
});

export default RT;
