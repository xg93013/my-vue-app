<template>
  <transition name="slide">
    <div class="my-add-song" v-show="showFlag" @click.stop>
      <!-- 头部 -->
      <div class="header">
        <h2 class="title">添加歌曲到歌单</h2>
        <div class="close">
          <i class="icon-close" @click="hide"></i>
        </div>
      </div>
      <!-- 搜索框 -->
      <div class="search-box-wrapper">
        <my-search-box ref="searchBoxRef" @query="queryChange"></my-search-box>
      </div>
      <div class="tab-wrapper" v-show="!query">
        <!-- tab切换 -->
        <div class="tab-box">
          <my-switches :switches="switches" :switchIndex="switchIndex" @switch="switchItem"></my-switches>
        </div>
        <!-- 切换 -->
        <div class="list-wrapper">
          <!-- 最近播放 -->
          <my-scroll ref="playHistoryRef" class="list-scroll" v-if="switchIndex === 0" :data="playHistory">
            <div class="list-inner">
              <my-song-list :songs="playHistory" @select="addSong"></my-song-list>
            </div>
          </my-scroll>
          <!-- 搜索历史 -->
          <my-scroll ref="searchHistoreRef" class="list-scroll" v-if="switchIndex === 1" :data="searchHistory">
            <div class="list-inner">
              <my-search-list :searches="searchHistory" ref="searchListRef" @delete="deleteHis" @select="addQuery"></my-search-list>
            </div>
          </my-scroll>
        </div>
      </div>
      <!-- 搜索结果 -->
      <div class="search-result" v-show="query">
        <my-search-result :query="query" :zhida="zhida" @select="selectResult"></my-search-result>
      </div>
      <!-- 提示框 -->
      <my-tips ref="tipRef" :msg="tipMsg"></my-tips>
    </div>
  </transition>
</template>
<script>
import MySearchBox from '@/components/base/MySearchBox/MySearchBox'
import MySwitches from '@/components/base/MySwitches/MySwitches'
import MyScroll from '@/components/base/MyScroll/MyScroll'
import MySongList from '@/components/base/MySongList/MySongList'
import MySearchList from '@/components/base/MySearchList/MySearchList'
import MySearchResult from '@/components/MySearchResult/MySearchResult'
import MyTips from '@/components/base/MyTips/MyTips'
import { SingerSong } from '@/assets/js/SingerSongClass.js'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    MySearchBox,
    MySwitches,
    MyScroll,
    MySongList,
    MySearchResult,
    MySearchList,
    MyTips
  },
  data () {
    return {
      showFlag: false,
      query: '',
      tipMsg: '',
      // 不搜索歌手
      zhida: false,
      switches: [
        {name: '最近播放'},
        {name: '搜索历史'}
      ],
      switchIndex: 0
    }
  },
  watch: {},
  created () {
    console.log(this.searchHistory)
  },
  methods: {
    ...mapActions(['saveHistory', 'delHistory', 'insertSong']),
    show () {
      this.showFlag = true
      setTimeout(() => {
        if (this.switchIndex === 0) {
          this.$refs.playHistoryRef.refresh()
        } else {
          this.$refs.searchHistoreRef.refresh()
        }
      }, 20)
    },
    hide () {
      this.showFlag = false
    },
    switchItem (index) {
      this.switchIndex = index
    },
    // 搜索历史列表选择
    addQuery (key) {
      this.$refs.searchBoxRef.getQuery(key)
    },
    // 删除搜索历史
    deleteHis (item) {
      this.delHistory(item)
    },
    // 查询歌曲
    queryChange (query) {
      this.query = query
    },
    // 搜索历史结果选择
    selectResult () {
      this.saveHistory(this.query)
      this.tipMsg = '添加成功'
      this.$refs.tipRef.show()
    },
    // 最近播放
    addSong (item, index) {
      if (index !== 0) {
        this.insertSong(new SingerSong(item))
        this.tipMsg = '添加成功'
        this.$refs.tipRef.show()
      }
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
    top: 170px;
    bottom: 0;
    width: 100%;
    .list-scroll{
      height: 100%;
      overflow: hidden;
      .list-inner{
        padding: 10px 30px;
      }
    }
  }
  .search-result{
    position: fixed;
    top: 120px;
    bottom: 0;
    width: 100%;
  }
}
</style>

