<template>
  <my-scroll class="my-search-result" ref="resultScrollRef" :data="result" :pullup="pullup" @scrollToEnd="scrollToEnd">
    <ul class="result-list">
      <li class="result-item" v-for="item in result" @click="selectItem(item)">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <span class="text" v-html="getSingerOrSong(item)"></span>
        </div>
      </li>
    </ul>
  </my-scroll>
</template>

<script>
import MyScroll from '@/components/base/MyScroll/MyScroll'
import { search } from '@/api/search.js'
import { createSingerSong } from '@/assets/js/SingerSongClass.js'
import { Singer } from '@/assets/js/SingerClass.js'
import { mapMutations, mapActions } from 'vuex'
export default {
  components: {
    MyScroll
  },
  data () {
    return {
      // 当前页
      page: 1,
      // 每一页的数量
      perpage: 20,
      // 搜索结果
      result: [],
      // 是否加载旺
      hasMore: true,
      pullup: true
    }
  },
  props: {
    query: {
      type: String,
      default: ''
    },
    zhida: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    query (newV) {
      this.search()
    }
  },
  methods: {
    ...mapMutations({
      'setSinger': 'SET_SINGER'
    }),
    ...mapActions(['insertSong']),
    search () {
      this.page = 1
      this.hasMore = true
      this.$refs.resultScrollRef.scrollTo(0, 0)
      search(this.query, this.page, this.perpage, this.zhida).then((res) => {
        if (res.code === 0) {
          this.result = this._formatSearch(res.data)
          this._checkMore(res.data)
        }
      })
    },
    scrollToEnd () {
      if (!this.hasMore) {
        return
      }
      this.page ++
      search(this.query, this.page, this.perpage, this.zhida).then((res) => {
        if (res.code === 0) {
          this.result = this.result.concat(this._formatSearch(res.data))
          this._checkMore(res.data)
        }
      })
    },
    // 重组搜索结果
    _formatSearch (data) {
      let result = []
      // 存储歌手信息
      if (data.zhida && data.zhida.singerid) {
        result.push({...data.zhida, ...{type: 'singer'}})
      }
      // 存储歌曲信息
      if (data.song) {
        result = result.concat(this._formatSongs(data.song.list))
      }
      return result
    },
    // 重组歌曲
    _formatSongs (data) {
      let result = []
      data.forEach((item) => {
        if (item.songid && item.albummid) {
          result.push(createSingerSong(item))
        }
      })
      return result
    },
    _checkMore (data) {
      let song = data.song
      if ((song.curnum + song.curpage * this.perpage) > song.totalnum || !song.list.length) {
        this.hasMore = false
      }
    },
    getIconCls (item) {
      if (item.type === 'singer') {
        return 'icon-mine'
      } else {
        return 'icon-music'
      }
    },
    getSingerOrSong (item) {
      if (item.type === 'singer') {
        return item.singername
      } else {
        return `${item.name} - ${item.singer}`
      }
    },
    selectItem (item) {
      if (item.type === 'singer') {
        let singer = new Singer({
          id: item.singermid,
          name: item.singername
        })
        this.$router.push({
          'path': `/search/${item.singermid}`
        })
        this.setSinger(singer)
      } else {
        this.insertSong(item)
      }
      this.$emit('select')
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/scss/const.scss';
@import '~@/assets/scss/mymixin.scss';
.my-search-result{
  height: 100%;
  overflow: hidden;
  .result-list{
    .result-item{
      display: flex;
      height: 40px;
      align-items: center;
      // width: 100%;
      padding:0 30px;
      .icon{
        flex: 0 0 40px;
        width: 40px;
        font-size: 14px;
        color: $color-text-d;
      }
      .name{
        flex: 1;
        font-size: $font-size-medium;
        color: $color-text-d;
        overflow: hidden;
        .text{
          @include no-wrap();
        }
      }
    }
    
  }
}
</style>


