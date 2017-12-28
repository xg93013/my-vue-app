<template>
  <transition name="slide">
    <my-music-lists class="my-song-list-detail" :songs="songs" :title="title" :bgImage="bgImage"></my-music-lists>
  </transition>
</template>
<script>
import MyMusicLists from '@/components/MyMusicList/MyMusicLists'
import { mapGetters } from 'vuex'
import { getSongList } from '@/api/recommend.js'
import { createSingerSong } from '@/assets/js/SingerSongClass.js'
export default {
  components: {
    MyMusicLists
  },
  data () {
    return {
      songs: []
    }
  },
  created () {
    console.log(this.songlist)
    this._getSongList()
  },
  methods: {
    // 获取歌单
    _getSongList () {
      if (!this.songlist.dissid) {
        this.$router.push('/recommend')
        return
      }
      getSongList(this.songlist.dissid).then((res) => {
        if (res.code === 0) {
          console.log(res.cdlist)
          // this.songs = this._formatSongs(res.cdlist[0].songlist)
        }
      })
    },
    _formatSongs (list) {
      let result = []
      list.forEach((item) => {
        if (item.songid && item.albummid) {
          result.push(createSingerSong(item))
        }
      })
    }
  },
  computed: {
    ...mapGetters(['songlist']),
    title () {
      return this.songlist.dissname
    },
    bgImage () {
      return this.songlist.imgurl
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/scss/const.scss';
@import '~@/assets/scss/mymixin.scss';
</style>


