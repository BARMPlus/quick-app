<template>
  <div ref="wrapper" class="__scroll__">
    <slot></slot>
  </div>
</template>
<script>
import BScroll from 'better-scroll'

export default {
  mounted () {
    setTimeout(() => {
      this._initScroll()
      this._initHeight()
    }, 20)
  },
  props: {
    autoScroll: {
      type: Boolean,
      default: true
    },
    startY: {
      type: Number,
      default: 0
    },
    pullUp: {
      type: Boolean,
      default: false
    },
    probeType: {
      type: Number,
      default: 3
    },
    click: {
      type: Boolean,
      default: true
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    pullDownRefresh: {
      default: false
    },
    pullUpLoad: {
      default: false
    },
    data: {
      // type: Array,  //不设定type
      default: null
    }
  },
  methods: {
    _initScroll () {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        startY: this.startY,
        probeType: this.probeType,
        click: this.click,
        pullUpLoad: this.pullUpLoad,
        pullDownRefresh: this.pullDownRefresh
      })
      if (this.listenScroll) { // 派发滚动事件
        this.scroll.on('scroll', (pos) => {
          this.$emit('scroll', pos)
        })
      }
      if (this.pullUp) {
        this.scroll.on('scrollEnd', () => {
          if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
            this.$emit('scrollToEnd')
          }
        })
      }

      if (this.pullDownRefresh) {
        this.scroll.on('pullingDown', () => {
          this.$emit('pullingDown')
        })
      }
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
          this.$nextTick(() => {
            this.refresh()
            this.scroll.scrollTo(0, this.scroll.maxScrollY)
            /* 写成this.scrollTo无法使用，原因不详 */
            this.finishPullUp()
          })
        })
      }
    },
    _initHeight () {
      if (!this.autoScroll) {
        this.refresh()
        return
      }
      let parentNode = this.$refs.wrapper
      let container = this.$slots.default[0].elm
      container.style.height = 'auto'
      if (container.clientHeight <= parentNode.clientHeight) {
        container.style.height = `${parentNode.clientHeight + 1}px`
      }
      this.refresh()
    },
    pullDownAfter () {
      this.refresh()
      this.finishPullDown()
    },
    scrollTo () {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    finishPullUp () {
      this.scroll && this.scroll.finishPullUp()
    },
    finishPullDown () {
      this.scroll && this.scroll.finishPullDown()
    },
    disable () {
      // 代理better-scroll的disable方法
      this.scroll && this.scroll.disable()
    },
    enable () {
      // 代理better-scroll的enable方法
      this.scroll && this.scroll.enable()
    },
    refresh () {
      // 代理better-scroll的refresh方法
      this.scroll && this.scroll.refresh()
    }
  },
  watch: {
    data () {
      this.$nextTick(() => {
        this._initHeight()
      })
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .__scroll__ {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
