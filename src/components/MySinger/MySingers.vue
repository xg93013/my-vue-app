<template>
    <div class="rank-content">
        <my-scroll :data="toplist" ref="rankRef" class="rank-scroll">
            <ul>
                <li v-for="item in toplist" class="item" @click="selectItems(item)">
                    <div class="rankImg">
                        <img v-lazy="item.picUrl" width="100px" height="100px"/>
                    </div>
                    <ul class="songlist">
                        <li class="song" v-for="(song,index) in item.songList">
                            <span>{{index + 1}}</span>
                            <span>{{song.songname}}</span>
                            <span> - {{song.singername}}</span>
                        </li>
                    </ul>
                </li>
            </ul>
            <!-- loading 组件 -->
            <div v-show="!toplist.length" class="loading-container">
                <my-loading></my-loading>
            </div>
        </my-scroll>
        <router-view></router-view>
    </div>
</template>
<script>
import MyScroll from '@/components/base/MyScroll/MyScroll'
import MyLoading from '@/components/base/MyLoading/MyLoading'
import { getRankList } from '@/api/rank.js'
import { mapMutations } from 'vuex'
export default {
  components: {
    MyScroll,
    MyLoading
  },
  data () {
    return {
      toplist: [],
      pageIndex: 1
    }
  },
  watch: {},
  methods: {
    ...mapMutations({
      setTestList: 'SET_TESTLIST'
    }),
    _getRankList () {
      getRankList().then((res) => {
        if (res.code === 0) {
          this.toplist = res.data.topList
        }
      })
    },
    selectItems (item) {
      this.$router.push({
        path: `/singer/${item.id}`
      })
      this.setTestList(item)
    }
  },
  computed: {},
  created () {
    this._getRankList()
  },
  mounted () {},
  destroyed () {}
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/const.scss';
@import '~@/assets/scss/mymixin.scss';
.rank-content{
    position:fixed;
    width:100%;
    top:100px;
    bottom: 0;
    .rank-scroll{
        height: 100%;
        overflow: hidden;
        .item{
            display: flex;
            margin:0 20px;
            padding-top:20px;
            height: 100px;
            .rankImg{
                flex: 0 0 100px;
                width:100px;
                height:100px;
            }
            .songlist{
                flex: 1;
                display: flex;
                height: 100px;
                flex-direction: column;
                justify-content: center;
                padding: 0 20px;
                background: $color-highlight-background;
                font-size: $font-size-small;
                color: $color-text-d;
                overflow: hidden;
                .song{
                    @include no-wrap();
                    line-height: 30px;
                }
            }
        }
    }
    .loading-container{
      position: absolute;
      width: 100%;
      top: 100px;
      text-align: center;
      transform: translateY(-50%);
    }
}


</style>

