/**
 * Created by Administrator on 2018/4/9.
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _import = require('./_import_' + process.env.NODE_ENV)

let constantRouterMap = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: _import('home/index') },
  { path: '/timetable', component: _import('time-table/index') },
  { path: '/my', component: _import('my/index') }

]

export default new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
