<!-- 顶部提示 组件 -->
<template>
  <transition name="drop">
    <div class="my-tips" v-show="showFlag" @click.stop="hide">
      <div class="tip-title">
        <i class="icon-ok"></i>
        <span class="text">{{ msg }}</span>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      showFlag: false
    }
  },
  props: {
    // 延迟关闭时间
    delay: {
      type: Number,
      default: 2000
    },
    msg: {
      type: String,
      default: ''
    }
  },
  watch: {},
  methods: {
    show () {
      this.showFlag = true
      clearTimeout(this.timer)
      // delay 秒自动关闭
      this.timer = setTimeout(() => {
        this.showFlag = false
      }, this.delay)
    },
    hide () {
      this.showFlag = false
    }
  },
  computed: {},
  created () {},
  mounted () {},
  destroyed () {}
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/const.scss';
@import '~@/assets/scss/mymixin.scss';

.my-tips {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 500;
  background: $color-dialog-background;
  &.drop-enter-active, &.drop-leave-active {
    transition: all 0.3s;
  }
  &.drop-enter, &.drop-leave-to {
    transform: translate3d(0, -100%, 0);
  }
  .tip-title{
    text-align: center;
    padding: 18px 0;
    font-size: 0;
    .icon-ok {
      font-size: $font-size-medium;
      color: $color-theme;
      margin-right: 4px;
    }
    .text {
      font-size: $font-size-medium;
      color: $color-text;
    }
  }
}
</style>
