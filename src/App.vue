<template>
    <div id="app">
        <keep-alive>
            <router-view class="router-view"></router-view>
        </keep-alive>
        <tabs></tabs>
    </div>
</template>

<script>
import Tabs from 'components/tabs/index'

export default {
  name: 'app',
  components: {
    Tabs
  }
}
</script>

<style lang="scss">
    @import './styles/base';
    @import './styles/mixin';
    @import './styles/variable';

    #app {
        height: 100%;
        .router-view {
            overflow-x: hidden;
            height: calc(100% - #{px2rem($tab-height)});
        }
    }
</style>
