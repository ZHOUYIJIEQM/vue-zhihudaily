<template>
  
</template>
<script>
  import {mapActions} from 'vuex'
  export default {
    data(){
      return {

      }
    },
    methods: {
      ...mapActions(['getNewsLatest', 'getNewsBefore', ]),
      
    }
  }
</script>
<style lang="scss" scoped>
  // @import '@/styles/.scss';
</style>