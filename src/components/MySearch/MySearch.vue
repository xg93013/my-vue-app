<template>
  <div class="my-search">
    <!-- 搜索框 -->
    <div class="search-box-wrapper">
      <my-search-box ref="searchBoxRef" @query="onQueryChange"></my-search-box>
    </div>
    <div class="shortcut-wrapper" v-show="!query" ref="shortcutRef">
      <my-scroll class="shortcut" ref="scrollRef" :data="scrollData" :refreshDelay="refreshDelay">
        <div class="short-scroll">
          <!-- 热门搜索 -->
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li class="item" v-for="item in hotkey" @click="addQuery(item.k)">
                <span>{{ item.k }}</span>
              </li>
            </ul>
          </div>
          <!-- 搜索历史 -->
          <div class="search-history">
            <div class="title">
              <span class="title-text">搜索历史</span>
              <span class="clear" @click="clearHis">
                <i class="icon-clear"></i>
              </span>
            </div>
            <my-search-list :searches="searchHistory" @select="addQuery" @delete="deleteHis"></my-search-list>
          </div>
        </div>
      </my-scroll>
    </div>
    <!-- 搜索结果 -->
    <div class="search-result" v-show="query" ref="resultRef">
      <my-search-result ref="resultListRef" :query="query" :zhida="zhida" @select="saveHis"></my-search-result>
    </div>
    <!-- 确认对话框 -->
    <my-confirm ref="confirmRef" @confirm="confirm" @cancel="cancel"></my-confirm>
    <router-view></router-view>
  </div>

</template>
<script>
import MySearchBox from '@/components/base/MySearchBox/MySearchBox'
import MySearchResult from '@/components/MySearchResult/MySearchResult'
import MySearchList from '@/components/base/MySearchList/MySearchList'
import MyConfirm from '@/components/base/MyConfirm/MyConfirm'
import MyScroll from '@/components/base/MyScroll/MyScroll'
import { getHotKey } from '@/api/search.js'
import { mapActions, mapGetters } from 'vuex'
import { playlistMixin } from '@/assets/js/mixin.js'
export default {
  mixins: [playlistMixin],
  components: {
    MySearchBox,
    MySearchList,
    MySearchResult,
    MyConfirm,
    MyScroll
  },
  data () {
    return {
      hotkey: [],
      query: '',
      zhida: true,
      // 延迟刷新
      refreshDelay: 100
    }
  },
  watch: {
    query (newv) {
      if (!newv) {
        setTimeout(() => {
          this.$refs.scrollRef.refresh()
        }, 20)
      }
    }
  },
  methods: {
    ...mapActions(['saveHistory', 'delHistory', 'clearHistory']),
    onQueryChange (query) {
      this.query = query
    },
    addQuery (key) {
      this.$refs.searchBoxRef.getQuery(key)
    },
    deleteHis (item) {
      this.delHistory(item)
    },
    saveHis () {
      this.saveHistory(this.query)
    },
    clearHis () {
      this.$refs.confirmRef.show()
    },
    confirm () {
      this.clearHistory()
    },
    cancel () {
      this.$refs.confirmRef.hide()
    },
    _getHotKeys () {
      getHotKey().then((res) => {
        if (res.code === 0) {
          this.hotkey = res.data.hotkey.slice(0, 10)
        }
      })
    },
    // 当有迷你播放器时，调整滚动底部距离
    handlePlaylist (playlist) {
      let bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.shortcutRef.style.bottom = bottom
      this.$refs.scrollRef.refresh()
      this.$refs.resultRef.style.bottom = bottom
      this.$refs.resultListRef.refresh()
    }
  },
  created () {
    this._getHotKeys()
  },
  computed: {
    ...mapGetters(['searchHistory']),
    scrollData () {
      return this.hotkey.concat(this.searchHistory)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/scss/const.scss';
@import '~@/assets/scss/mymixin.scss';
.my-search{
  .search-box-wrapper{
    margin: 20px;
  }
  .shortcut-wrapper{
    position: fixed;
    top: 170px;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    .shortcut{
      height: 100%;
      overflow: hidden;
      .short-scroll{
        .hot-key{
          margin: 0 20px 20px 20px;
          .title{
            margin-bottom: 20px;
            font-size: $font-size-medium;
            color: $color-text-l;
          }
          .item{
            display: inline-block;
            padding: 5px 10px;
            border-radius: 6px;
            margin: 10px 0px 0 10px;
            background: $color-highlight-background;
            font-size: $font-size-medium;
            color: $color-text-d;
          }
        }
        .search-history{
          position: relative;
          margin: 0 20px;
          .title{
            // width: 100%;
            height: 40px;
            align-items: center;
            font-size: $font-size-medium;
            color: $color-text-l;
            display: flex;
            .title-text{
              flex: 1;
            }
            .clear{
              @include extend-click();
              .icon-clear{
                font-size: $font-size-medium;
                color: $color-text-d;
              }
            }
          }
        }
      }
    }
  }
  .search-result{
    position: fixed;
    width: 100%;
    top: 180px;
    bottom: 0;
  }
}
</style>

