<template>
    <div class="member">
        <swipe :images="images"/>
    </div>
</template>

<script>
import Swipe from './components/swipe/index'
export default {
  data () {
    return {
      images: [require('static/2.jpg'), require('static/3.jpg'), require('static/4.jpg'), require('static/5.jpg')]
    }
  },
  components: {
    Swipe
  }
}
</script>

<style lang="scss" scoped>

</style>
