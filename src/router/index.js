import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//各个页面组件
import home from '@/components/home'
import read from '@/components/read'
import music from '@/components/music'
import movie from '@/components/movie'
import readDetail from '@/components/readDetail'
import musicDetail from '@/components/musicDetail'
import movieDetail from '@/components/movieDetail'

import search from '@/components/search'
import login from '@/components/login'
import reg from '@/components/reg'
import user from '@/components/user'

import readFavorite from '@/components/readFavorite'
import musicFavorite from '@/components/musicFavorite'
import movieFavorite from '@/components/movieFavorite'

import userinfo from '@/components/userinfo'
import setup from '@/components/setup'
import feedback from '@/components/feedback'

//路由
export default new Router({
  routes: [
    {
      path: '/',
      name: '/',
      redirect: '/home'
    },{
      path: '/home',
      name: 'home',
      component: home
    },{
      path: '/read',
      name: 'read',
      component: read
    },{
      path: '/music',
      name: 'music',
      component: music
    },{
      path: '/movie',
      name: 'movie',
      component: movie
    },{
      path: '/readDetail/:id',
      name: 'readDetail',
      component: readDetail
    },{
      path: '/musicDetail/:id',
      name: 'musicDetail',
      component: musicDetail
    },{
      path: '/movieDetail/:id',
      name: 'movieDetail',
      component: movieDetail
    },{
      path: '/login',
      name: 'login',
      component: login
    },{
      path: '/reg',
      name: 'reg',
      component: reg
    },{
      path: '/user',
      name: 'user',
      component: user
    },{
      path: '/search',
      name: 'search',
      component: search
    },{
      path: '/readFavorite',
      name: 'readFavorite',
      component: readFavorite
    },{
      path: '/musicFavorite',
      name: 'musicFavorite',
      component: musicFavorite
    },{
      path: '/movieFavorite',
      name: 'movieFavorite',
      component: movieFavorite
    },{
      path: '/userinfo',
      name: 'userinfo',
      component: userinfo
    },{
      path: '/setup',
      name: 'setup',
      component: setup
    },{
      path: '/feedback',
      name: 'feedback',
      component: feedback
    }
  ]
})
