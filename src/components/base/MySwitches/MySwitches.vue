<template>
  <ul class="my-switches">
    <li class="switch-item" v-for="(item, index) in switches" :class="{'active':switchIndex === index}" @click="switchItem(index)">{{item.name}}</li>
  </ul>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: {
    switches: {
      type: Array,
      default: []
    },
    switchIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    switchItem (index) {
      this.$emit('switch', index)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/scss/const.scss';
@import '~@/assets/scss/mymixin.scss';
.my-switches{
  display: flex;
  margin: 20px 60px;
  border:1px solid $color-highlight-background;
  border-radius: 4px;
  .switch-item{
    flex: 1;
    height: 30px;
    line-height: 30px;
    font-size: $font-size-medium;
    color: $color-text-d;
    text-align: center;
    &.active {
      background: $color-highlight-background;
      color: $color-text;
    }
  }
}
</style>

