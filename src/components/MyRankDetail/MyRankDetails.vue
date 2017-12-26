<template>
  <transition name="slide" class="my-rank-detail">
    <my-music-lists :songs="songs" :title="title" :imgUrl="imgUrl" :rank="true"></my-music-lists>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import MyMusicLists from '@/components/MyMusicList/MyMusicLists'
import { getRankDetail } from '@/api/rank.js'
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
  watch: {},
  methods: {
    _getTestkDetail () {
      if (!this.testList.id) {
        this.$router.push('/singer')
        return
      }
      getRankDetail(this.testList.id).then((res) => {
        if (res.code === 0) {
          this.songs = this._formatSong(res.songlist)
        }
      })
    },
    _formatSong (songlist) {
      var result = []
      songlist.forEach(element => {
        if (element.data.albumid && element.data.songid) {
          result.push(createSingerSong(element.data))
        }
      })
      return result
    }
  },
  computed: {
    ...mapGetters(['testList']),
    title () {
      return this.testList.topTitle
    },
    imgUrl () {
      return this.testList.picUrl
    }
  },
  created () {
    this._getTestkDetail()
  },
  mounted () {},
  destroyed () {}
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


