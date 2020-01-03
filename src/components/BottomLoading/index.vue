<template>
  <div class="infinite-rotate" v-show="loading">
    <div class="loader">
      <svg class="loader-circular" viewBox="25 25 50 50">
        <circle class="loader-path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"></circle>
      </svg>
    </div>
    <span class="infinite-rotate-text">{{loadingText}}</span>
  </div>
</template>
<script>
  export default {
    props: {
      loading: {
        type: Boolean,
        default: false
      },
      loadingText: {
        type: String,
        default: '正在加载...'
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/bottomLoading.scss';
</style>