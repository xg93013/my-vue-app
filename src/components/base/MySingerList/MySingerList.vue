<template>
  <my-scroll ref="scrollRef" :data="data" :probeType="probeType" :listen-scroll="listenScroll" @scroll="scroll" class="my-singer-list">
    <ul>
      <li ref="leftRef" v-for="group in data" class="list-group">
        <h2 class="list-group-title">{{ group.title }}</h2>
        <ul>
          <li v-for="item in group.items" @click="selectItem(item)" class="list-group-item">
            <img v-lazy="item.avatar" class="avatar">
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>

    <!-- 滚动固定标题实现 -->
    <div ref="fixedTitleRef" v-show="fixedTitle" class="list-fixed">
      <h1 class="fixed-title">{{ fixedTitle }}</h1>
    </div>

    <!-- loading 组件 -->
    <div v-show="!data.length" class="loading-container">
      <my-loading></my-loading>
    </div>

    <!-- 右侧字母 -->
    <div  @touchstart="shortcutTouchStart"
          @touchmove.stop.prevent="shortcutTouchMove"
          class="list-shortcut">
      <ul>
        <li v-for="(item, index) in shortcut" :data-index="index" :class="{'current': currentIndex === index}" class="item">{{ item }}</li>
      </ul>
    </div>
  </my-scroll>
</template>
<script>
import MyScroll from '@/components/base/MyScroll/MyScroll'
import MyLoading from '@/components/base/MyLoading/MyLoading'
import { myDOM } from '@/assets/js/myutils.js'

const TITLE_HEIGHT = 29

export default {
  components: {
    MyScroll,
    MyLoading
  },
  data () {
    return {
      scrollY: -1,
      currentIndex: 0,
      diff: -1
    }
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  watch: {
    // 重新计算列表项高度
    data () {
      setTimeout(() => {
        this._calHeight()
      }, 20)
    },
    // 滚动距离
    scrollY (newY) {
      const leftListHeight = this.leftListHeight
      let posY = -newY
      if (newY > 0) {
        return
      }
      for (let i = 0; i < leftListHeight.length; i++) {
        if (posY >= leftListHeight[i] && posY < leftListHeight[i + 1]) {
          this.currentIndex = i
          this.diff = leftListHeight[i + 1] + newY // 滚动的下一个title距离顶部的距离
          return
        }
      }
    },
    diff (newY) {
      let moveTo = (newY > 0 && newY < TITLE_HEIGHT) ? newY - TITLE_HEIGHT : 0
      if (this.moveTo === moveTo) {
        return
      }
      this.moveTo = moveTo
      this.$refs.fixedTitleRef.style.transform = `translate3d(0,${moveTo}px,0)`
    }
  },
  created () {
    this.touch = {}
    this.listenScroll = true
    this.leftListHeight = []
    this.probeType = 3 // better-scroll 滚动组件 不截留
  },
  methods: {
    scroll (pos) {
      this.scrollY = pos.y
    },
    // 向上派发item项点击事件
    selectItem (item) {
      this.$emit('select', item)
    },
    // 计算title高度
    _calHeight () {
      let height = 0
      let list = this.$refs.leftRef
      this.leftListHeight = []
      this.leftListHeight.push(height)

      for (let i = 0; i < list.length; i++) {
        height += list[i].clientHeight
        this.leftListHeight.push(height)
      }
    },
    // 滑动右侧，左侧联动
    shortcutTouchStart (e) {
      this.touch.y1 = e.touches[0].pageY
      let nowIndex = myDOM.customAttribute(e.target, 'index')
      this.touch.nowIndex = nowIndex
      this._scrollTo(nowIndex)
    },
    // 拖动计算偏移
    shortcutTouchMove (e) {
      this.touch.y2 = e.touches[0].pageY
      let offset = Math.floor((this.touch.y2 - this.touch.y1) / 18)
      let nowIndex = Number(this.touch.nowIndex + offset)
      this._scrollTo(nowIndex)
    },
    // 滚动至指定字母
    _scrollTo (index) {
      if (!index) {
        return
      }
      if (index < 0) {
        index = 0
      } else if (index > this.leftListHeight.length - 2) {
        index = this.leftListHeight.length - 2
      }
      this.currentIndex = Number(index)
      this.$refs.scrollRef.scrollToElement(this.$refs.leftRef[index], 0)
    }
  },
  computed: {
    fixedTitle () {
      if (this.scrollY > 0) {
        return ''
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    },
    shortcut () {
      return this.data.map((group) => {
        return group.title.substr(0, 1)
      })
    }
  },
  mounted () {},
  destroyed () {}
}
</script>
<style lang="scss" scoped>
@import '~@/assets/scss/const.scss';
.my-singer-list{
  position: relative;
  width: 100%;
  height: 100%;
  padding-bottom: 40px;
  overflow: hidden;
  background: $color-background;
  .list-group{
    width: 100%;
    .list-group-title{
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
    .list-group-item{
      display: flex;
      align-items: center;
      padding: 10px 30px;
      .avatar{
        flex: 0 0 50px;
        width: 50px;
        height: 50px;
        // margin: 5px 0 5px 20px;
        border-radius: 50%;
      }
      .name{
        margin-left: 20px;
        flex: 1;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }
  .list-shortcut{
    position: absolute;
    right: 0;
    top: 50%;
    z-index: 30;
    width: 20px;
    padding: 20px 0;
    text-align: center;
    border-radius: 10px;
    background: $color-background-d;
    font-family: Arial, Helvetica, sans-serif;
    transform: translateY(-50%);
    .item{
      // padding: 3px;
      height: 18px;
      line-height: 18px;
      color: $color-text-l;
      font-size: $font-size-small;
      &.current{
        color: $color-theme;
      }
    }
  }
  .loading-container{
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
  .list-fixed{
    position: absolute;
    top: -1px;
    left: 0;
    width: 100%;
    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }
}
</style>


