<template>
    <div id="app" :class="{pc:isPcFlag}">
        <router-view/>
    </div>
</template>

<script>
import { isPc } from 'utils'
export default {
  name: 'app',
  data () {
    return {
      isPcFlag: false
    }
  },
  mounted () {
    this.isPcFlag = isPc()
  }
}
</script>

<style lang="scss">
    @import './styles/base';

    #app {
        height: 100%;
        &.pc{
            position: relative;
            transform: translate(0,0);
            width: 10rem;
            min-height: 100%;
            margin: 0 auto auto;
        }
    }
</style>
