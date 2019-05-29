import Vue from 'vue'
import { Button, Swipe, SwipeItem, Lazyload } from 'vant'

let component = [Button, Swipe, SwipeItem]
component.forEach((key) => {
  Vue.use(key)
})

Vue.use(Lazyload, {
  preLoad: 1.3, // 预装高度
  loading: require('../assets/image/lazy-loading.png'),
  error: require('../assets/image/lazy-loading.png')
})
