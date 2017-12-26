<!-- 歌单列表组件 -->
<template>
  <div class="my-music-lists">
    <!-- 返回按钮 -->
    <div @click="back" class="back">
      <i class="icon-back"></i>
    </div>
    <div class="title" v-html="title"></div>

    <!-- 背景图 -->
    <div class="bgImg" :style="bgStyle" ref="bgImageRef">
      <!-- 随机播放全部 -->
      <div ref="playRef" v-show="songs.length > 0" class="play-wrapper">
        <div class="play">
          <i class="icon-play"></i>
          <span class="text" @click="playRandom">随机播放全部</span>
        </div>
      </div>
      <!-- 蒙层 -->
      <div ref="filterRef" class="filter"></div>
    </div>

    <!-- 推层 -->
    <div ref="bgLayerRef" class="bg-layer"></div>

    <my-scroll class="list"
              @scroll="scroll"
              ref="scrollRef"
              :data="songs"
              :probe-type="probeType"
              :listen-scroll="listenScroll">
      <div class="song-list-wrapper">
        <my-song-list :songs="songs" :rank="rank" @select="selectItem"></my-song-list>
      </div>

      <!-- loading 组件 -->
      <div v-show="!songs.length" class="loading-container">
        <my-loading></my-loading>
      </div>
    </my-scroll>
  </div>
</template>

<script>
import MySongList from '@/components/base/MySongList/MySongList'
import MyScroll from '@/components/base/MyScroll/MyScroll'
import MyLoading from '@/components/base/MyLoading/MyLoading'
import { mapActions } from 'vuex'
// import { playlistMixin } from '@/assets/js/mixin.js'

const TRANSFORMY_RESERVED = 40

export default {
  // mixins: [playlistMixin],
  components: {
    MySongList,
    MyScroll,
    MyLoading
  },
  data () {
    return {
      // 推层上移的距离
      scrollY: 0
    }
  },
  props: {
    songs: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: ''
    },
    imgUrl: {
      type: String,
      default: ''
    },
    rank: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    scrollY (newVal) {
      let minscrollY = -this.bgImageHeight + TRANSFORMY_RESERVED
      let moveY = Math.max(minscrollY, newVal)
      this.$refs.bgLayerRef.style['transform'] = `translate3d(0 ,${moveY}px, 0)`
      this.$refs.bgLayerRef.style['webkitTransform'] = `translate3d(0 ,${moveY}px, 0)`

      let scale = 1
      let blur = 0
      let formula = Math.abs(newVal / this.bgImageHeight)
      if (newVal > 0) {
        this.$refs.bgImageRef.style.zIndex = 20
        scale = scale + formula
        this.$refs.bgImageRef.style.transform = `scale(${scale})`
      } else {
        blur = Math.min(20 * formula, 20)
        this.$refs.bgImageRef.style.filter = `blur(${blur}px)`
        this.$refs.bgImageRef.style.zIndex = 0
      }
    }
  },
  methods: {
    ...mapActions(['selectPlay', 'randomPlay']),
    back () {
      this.$router.back()
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    selectItem (item, index) {
      this.selectPlay({
        list: this.songs,
        index
      })
    },
    playRandom () {
      this.randomPlay({
        list: this.songs
      })
    }
  },
  computed: {
    bgStyle () {
      return `background-image:url(${this.imgUrl})`
    }
  },
  created () {
    this.probeType = 3
    this.listenScroll = true
  },
  mounted () {
    this.bgImageHeight = this.$refs.bgImageRef.clientHeight

    // 滚动区域的初始 top，$el 为 DOM 元素
    this.$refs.scrollRef.$el.style.top = `${this.$refs.bgImageRef.clientHeight}px`
  },
  destroyed () {}
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/const.scss';
@import '~@/assets/scss/mymixin.scss';

.my-music-lists {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 100;
    .icon-back {
      display: block;
      padding: 15px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }
  .title{
    position: absolute;
    top: 0;
    left: 10%;
    z-index: 40;
    width: 80%;
    @include no-wrap();
    text-align: center;
    line-height: 50px;
    font-size: $font-size-large;
    color: $color-text;
  }
  .bgImg{
    position: relative;
    width: 100%;
    padding-top: 70%;
    z-index: 10;
    transform-origin: top;
    background-size: cover;
    .play-wrapper{
      position: absolute;
      bottom: 20px;
      z-index: 50;
      width: 100%;
      .play{
        width:200px;
        margin:0 auto;
        height:40px;
        line-height: 40px;
        text-align: center;
        border:1px solid $color-theme;
        border-radius: 20px;
        color:$color-theme;
      }
    }
    .filter{
      position: absolute;
      top: 0;
      left: 0;
      z-index: 20;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.5);
    }
  }
  .bg-layer{
    position: relative;
    height: 100%;
    // z-index: 99;
    background: $color-background;
  }
  .list{
    position: fixed;
    top: 40px;
    bottom: 0;
    // z-index: 999;
    width:100%;
    height:100%;
    // overflow: hidden;
    background: $color-background;
    .song-list-wrapper{
      padding: 20px 30px;
    }
  }
}

</style>
