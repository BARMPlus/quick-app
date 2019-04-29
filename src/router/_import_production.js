module.exports = file => () => import(/* webpackChunkName: "[request]" */'views/' + file + '.vue')
