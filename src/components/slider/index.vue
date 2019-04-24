<template>
    <div class="slider" ref="slider">
        <slot></slot>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  mounted () {
    this.$nextTick(() => {
      this._initScroll()
      this._initWidth()
    })
  },
  props: {
    data: {
      default: null
    },
    scrollX: {
      type: Boolean,
      default: true
    },
    click: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    _initScroll () {
      this.scroll = new BScroll(this.$refs.slider, {
        scrollX: this.scrollX,
        click: this.click
      })
    },
    _initWidth () {
      console.log(this.$refs.slider.scrollWidth)
      let slot = this.$slots.default[0].elm
      slot.style.width = `${this.$refs.slider.scrollWidth}px`
    }
  },
  watch: {
    data () {
      this.$nextTick(() => {
        this._initWidth()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    .slider {
      overflow-x: hidden;
    }
</style>
