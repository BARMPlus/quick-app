/**
 * Created by Administrator on 2018/4/9.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import getters from './getters'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  modules: {
  },
  getters,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
