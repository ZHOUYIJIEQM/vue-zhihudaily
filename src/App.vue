<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <globalLoad :refreshing="refreshing"></globalLoad>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    globalLoad: () => import('@/components/GlobalLoad')
  },
  computed: {
    refreshing(){
      return this.$store.state.refreshing;
    }
  },
  updated(){
    // console.log('app updated', this.refreshing)
  }
}
</script>

<style lang="scss" scoped>

</style>
