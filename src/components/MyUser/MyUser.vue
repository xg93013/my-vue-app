<template>
  <div class="my-user">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <div class="switch-wrapper">
      <my-switches :switches="switches" :switchIndex="switchIndex" @switch="switchTab"></my-switches>
    </div>
    <div class="play-wrapper" @click="playRandom">
      <i class="icon-play"></i>
      <span>随机播放全部</span>
    </div>
    
    <div class="song-list-wrapper" ref="listWrapper">
      <!-- 我的收藏 -->
      <my-scroll ref="favoriteListRef" class="list-scroll" v-if="switchIndex === 0" :data="favoriteList">
        <div class="list-inner">
          <my-song-list :songs="favoriteList" @select="addSong"></my-song-list>
        </div>
      </my-scroll>
      <!-- 最近播放 -->
      <my-scroll ref="playHistoryRef" class="list-scroll" v-if="switchIndex === 1" :data="playHistory">
        <div class="list-inner">
          <my-song-list :songs="playHistory" @select="addSong"></my-song-list>
        </div>
      </my-scroll>
    </div>
    
  </div>
</template>
<script>
import MySwitches from '@/components/base/MySwitches/MySwitches'
import MyScroll from '@/components/base/MyScroll/MyScroll'
import MySongList from '@/components/base/MySongList/MySongList'
import { mapGetters, mapActions } from 'vuex'
import { SingerSong } from '@/assets/js/SingerSongClass.js'
import { playlistMixin } from '@/assets/js/mixin.js'
export default {
  mixins: [playlistMixin],
  components: {
    MySwitches,
    MyScroll,
    MySongList
  },
  data () {
    return {
      switches: [
        { name: '我的收藏' },
        { name: '最近播放' }
      ],
      switchIndex: 0
    }
  },
  methods: {
    ...mapActions(['savefavoriteList', 'delfavoriteList', 'insertSong', 'randomPlay']),
    addSong (song) {
      this.insertSong(new SingerSong(song))
    },
    back () {
      this.$router.back()
    },
    // 当有迷你播放器时，调整滚动底部距离
    handlePlaylist (playlist) {
      let bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.listWrapper.style.bottom = bottom
      this.$refs.favoriteListRef && this.$refs.favoriteRef.refresh()
      this.$refs.playHistory && this.$refs.playListRef.refresh()
    },
    switchTab (index) {
      this.switchIndex = index
    },
    // 随机播放
    playRandom () {
      let list = this.switchIndex === 0 ? this.favoriteList : this.playHistory
      list = list.map((item) => {
        return new SingerSong(item)
      })
      this.randomPlay({list})
    }
  },
  computed: {
    ...mapGetters(['favoriteList', 'playHistory'])
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/scss/const.scss';
@import '~@/assets/scss/mymixin.scss';
.my-user{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $color-background;
  width: 100%;
  .back{
    position: absolute;
    left: 10px;
    top: 25px;
    color: $color-theme;
  }
  .switch-wrapper{
    width: 100%;
  }
  .play-wrapper{
    width: 140px;
    height: 34px;
    line-height: 34px;
    margin: 0 auto;
    color: $color-text-l;
    font-size: $font-size-medium;
    text-align: center;
    border-radius: 20px;
    border:1px solid $color-text-l;
  }
  .song-list-wrapper{
    position: absolute;
    top: 120px;
    bottom: 0;
    .list-scroll{
      height: 100%;
      overflow: hidden;
      .list-inner{
        padding: 10px 30px;
      }
    }
  }
}
</style>


