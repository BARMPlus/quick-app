<template>
    <div class="layout">
        <keep-alive>
            <router-view class="router-view"></router-view>
        </keep-alive>
        <tabs></tabs>
    </div>
</template>

<script>
    import Tabs from './components/tabs/index'
    export default {
        components: {
            Tabs
        }
    }
</script>

<style lang="scss" scoped>
    @import '~styles/mixin';
    @import '~styles/variable';
    .layout {
        height: 100%;
        .router-view {
            overflow-x: hidden;
            height: calc(100% - #{px2rem($tab-height)});
        }
    }
</style>