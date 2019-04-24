<template>
    <div class="tabs">
        <router-link to="/home" class="tab-item" replace>首页</router-link>
        <router-link to="/timetable" class="tab-item" replace>课表</router-link>
        <router-link to="/my" class="tab-item" replace>我的</router-link>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
    @import '~styles/mixin';
    @import '~styles/variable';
    .tabs{
        position: fixed;
        bottom: 0;
        display: flex;
        width: 10rem;
        height: px2rem($tab-height);
        background: #fff;
        .tab-item{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 33%;
            height: 100%;
        }
    }
</style>
