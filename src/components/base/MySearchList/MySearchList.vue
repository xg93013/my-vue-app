<template>
  <div class="my-search-list" v-show="searches.length">
    <transition-group name="list" tag="ul">
      <li :key="item" class="search-item" @click="selectItem(item)" v-for="item in searches">
        <span class="title">{{item}}</span>
        <span class="icon" @click.stop="deleteOne(item)">
          <i class="icon-delete"></i>
        </span>
      </li>
    </transition-group>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: {
    searches: {
      type: Array,
      default: []
    }
  },
  created () {},
  methods: {
    selectItem (item) {
      this.$emit('select', item)
    },
    deleteOne (item) {
      this.$emit('delete', item)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/scss/const.scss';
@import '~@/assets/scss/mymixin.scss';
.my-search-list{
  .search-item{
    display: flex;
    width: 100%;
    height: 40px;
    overflow: hidden;
    &.list-enter-active, &.list-leave-active{
      transition: all 0.2s;
    }
    &.list-enter, &.list-leave-to{
      height: 0;
    }
    .title {
      flex: 1;
      color: $color-text-l;
    }
    .icon {
      @include extend-click();
      .icon-delete {
        font-size: $font-size-small;
        color: $color-text-d;
      }
    }
  }

}
</style>