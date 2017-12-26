<template>
  <div class="my-singer" ref="singerRef">
    <my-singer-list ref="listRef" :data="singers" @select='selectSinger'></my-singer-list>
    <router-view></router-view>
  </div>
</template>
<script>
import { getSingerList } from '@/api/singer.js'
import { createSinger } from '@/assets/js/SingerClass.js'
import { mapMutations } from 'vuex'
import MySingerList from '@/components/base/MySingerList/MySingerList'

const HOT_TITLE = '热门'
const HTO_NUM = 10

export default {
  components: {
    MySingerList
  },
  data () {
    return {
      singers: []
    }
  },
  methods: {
    ...mapMutations({
      'setSinger': 'SET_SINGER'
    }),
    selectSinger (singer) {
      console.log(singer.id)
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    // 获取歌手列表
    _getSingerList () {
      getSingerList().then((res) => {
        if (res.code === 0) {
          // console.log(res.data)
          this.singers = this._formatSingers(res.data.list)
        }
      })
    },
    // 重组列表
    _formatSingers (list) {
      let map = {
        hot: {
          title: HOT_TITLE,
          items: []
        }
      }
      list.forEach((item, index) => {
        // 热门歌手
        if (index < HTO_NUM) {
          map.hot.items.push(createSinger(item))
        }

        // a-z歌手
        let key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(createSinger(item))
      })
      // 得到a-z有序列表
      let hot = []
      let others = []
      for (let key in map) {
        let value = map[key]
        if (value.title.match(/[a-zA-Z]/)) {
          others.push(value)
        } else if (value.title === HOT_TITLE) {
          hot.push(value)
        }
      }
      others.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })

      return hot.concat(others)
    }
  },
  created () {
    this._getSingerList()
  }
}
</script>
<style lang="scss" scoped>
.my-singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>


