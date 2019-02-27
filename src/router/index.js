import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import HelloWorld from '@/components/HelloWorld'
import Main from '@/components/Main'
import Login from '@/components/Login'
import Register from '@/components/Register'


const Topic = () => import('../components/Topic.vue')
const MyTopic = () => import('../components/myTopic.vue')
const UserInfo = () => import('../components/userInfo.vue')
const Comment =() => import('../components/comment.vue')

// Vue.use(Router)
 const route = [
    {
      path: '/',
      // name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      children:[
        {
          path: '/main/topic',
          name:'topic',
          component: Topic
        },
        {
          path: '/main/myTopic',
          name:'myTopic',
          component: MyTopic
        },
        {
          path: '/main/userInfo',
          name:'userInfo',
          component: UserInfo
        },
        {
          path:'/main/comment',
          name:'comment',
          component:Comment
        }
      ]
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    }
  ]


const router = new Router({
  mode: 'history',
  routes: route
})

export default router