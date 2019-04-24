/**
 * Created by Administrator on 2018/4/9.
 */
import Vue from 'vue'
import Router from 'vue-router'
import Layout from 'layout/index'

Vue.use(Router)

const _import = require('./_import_' + process.env.NODE_ENV)

let constantRouterMap = [
    {path: '/', redirect: '/home'},
    {
        path: '/home', component: Layout, redirect: '/home/index', children: [
            {path: 'index', component: _import('home/index')}
        ]
    },
    {
        path: '/timetable', component: Layout, redirect: '/timetable/index', children: [
            {path: 'index', component: _import('time-table/index')}
        ]
    },
    {
        path: '/my', component: Layout, redirect: '/my/index', children: [
            {path: 'index', component: _import('my/index')}
        ]
    }

]

export default new Router({
    mode: 'hash', // history后端支持可开
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
})
