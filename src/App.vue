<template>
  <div id="app">
    <my-header></my-header>
    <my-tab></my-tab>
    <router-view/>
    <my-players></my-players>
  </div>
</template>

<script>
import MyHeader from '@/components/MyHeader/MyHeader'
import MyTab from '@/components/MyTab/MyTab'
import MyPlayers from '@/components/MyPlayer/MyPlayers'
export default {
  components: {
    MyHeader,
    MyTab,
    MyPlayers
  }
}
</script>

<style lang="scss" scoped>
</style>
