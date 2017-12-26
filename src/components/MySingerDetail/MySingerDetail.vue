<template>
  <transition name="slide">
    <my-music-list :songs="songs" :title="title" :bg-image="bgImage"></my-music-list>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from '@/api/singer.js'
import { createSingerSong } from '@/assets/js/SingerSongClass.js'
import MyMusicList from '@/components/MyMusicList/MyMusicList'
export default {
  components: {
    MyMusicList
  },
  data () {
    return {
      songs: []
    }
  },
  methods: {
    _getSingerDetail () {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === 0) {
          this.songs = this._formatSongs(res.data.list)
        }
      })
    },
    _formatSongs (list) {
      let result = []
      list.forEach((item) => {
        // 解构赋值
        let {musicData} = item

        if (musicData.songid && musicData.albummid) {
          result.push(createSingerSong(musicData))
        }
      })
      return result
    }
  },
  created () {
    this._getSingerDetail()
  },
  computed: {
    ...mapGetters([
      'singer'
    ]),
    title () {
      return this.singer.name
    },
    bgImage () {
      return this.singer.avatar
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/const.scss';
@import '~@/assets/scss/mymixin.scss';
.slide-enter-active, .slide-leave-active {
  transition: all .3s ease;
}
.slide-enter, .slide-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
</style>


