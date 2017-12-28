<template>
  <transition name="slide">
    <div class="my-add-song" v-show="showFlag" @click.stop>
      <!-- 头部 -->
      <div class="header">
        <h2 class="title">添加歌曲到歌单</h2>
        <div class="close">
          <i class="icon-close"></i>
        </div>
      </div>
      <!-- 搜索框 -->
      <div class="search-box-wrapper">
        <my-search-box ref="searchBoxRef"></my-search-box>
      </div>
      <!-- tab切换 -->
      <div class="tab-box">
        <my-switches :switches="switches" :switchIndex="switchIndex" @switch="switchItem"></my-switches>
      </div>
      <div class="list-wrapper">
        <!-- 最近播放 -->
        <my-scroll ref="playHistoryRef" class="list-scroll" v-if="switchIndex === 0" :data="playHistory">
          <my-song-list :songs="playHistory" class="list-inner"></my-song-list>
        </my-scroll>
        <!-- 搜索历史 -->
        <my-scroll ref="searchHistoreRef" class="list-scroll" v-if="switchIndex === 1" :data="searchHistory">
          <my-search-list :searches="searchHistory" ref="searchListRef" @delete="delHistory" @select="addQuery" class="list-inner"></my-search-list>
        </my-scroll>
      </div>
    </div>
  </transition>
</template>
<script>
import MySearchBox from '@/components/base/MySearchBox/MySearchBox'
import MySwitches from '@/components/base/MySwitches/MySwitches'
import MyScroll from '@/components/base/MyScroll/MyScroll'
import MySongList from '@/components/base/MySongList/MySongList'
import MySearchList from '@/components/base/MySearchList/MySearchList'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    MySearchBox,
    MySwitches,
    MyScroll,
    MySongList,
    MySearchList
  },
  data () {
    return {
      showFlag: false,
      switches: [
        {name: '最近播放'},
        {name: '搜索历史'}
      ],
      switchIndex: 0
    }
  },
  created () {
    console.log(this.searchHistory)
  },
  methods: {
    ...mapActions(['saveHistory', 'delHistory', 'insertSong']),
    show () {
      this.showFlag = true
    },
    hide () {
      this.showFlag = false
    },
    switchItem (index) {
      this.switchIndex = index
    },
    addQuery (key) {
      this.$refs.searchBoxRef.getQuery(key)
    },
    delHistory (item) {
      this.delHistory(item)
    }
  },
  computed: {
    ...mapGetters(['playHistory', 'searchHistory'])
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/scss/const.scss';
@import '~@/assets/scss/mymixin.scss';
.my-add-song{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  background: $color-background;
  &.slide-enter-active, &.slide-leave-active{
    transition: all 0.2s;
  }
  &.slide-enter, &.slide-leave-to{
    transform: translate3d('100%', 0, 0);
  }
  .header{
    position: relative;
    height: 44px;
    line-height: 44px;
    text-align: center;
    .title {
      line-height: 44px;
      font-size: $font-size-large;
      color: $color-text;
    }
    .close{
      position: absolute;
      right: 10px;
      top: 4px;
      .icon-close{
        font-size: 20px;
        color: $color-theme;
      }
    }
  }
  .search-box-wrapper{
    margin: 10px 20px;
  }
  .list-wrapper{
    position: absolute;
    top: 180px;
    bottom: 0;
    width: 100%;
    .list-scroll{
      height: 100%;
      overflow: hidden;
      .list-inner{
        padding: 20px 30px;
      }
    }
  }
}
</style>

