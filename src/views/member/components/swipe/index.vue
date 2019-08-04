<template>
    <van-swipe :autoplay="0">
        <van-swipe-item v-for="(item,index) in images" :key="index">
            <img :src="item" class="image" />
        </van-swipe-item>
    </van-swipe>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    @import '~styles/mixin';
    @import '~styles/variable';
    .image{
        width: 10rem;
        height: 320px;
    }
</style>
