<template>
  <div class="today-post" v-if="story.length>0">
    <div class="post-outer" v-for="(item, index) in story" :key="index" @click="goPage(item.id)">
      <div class="descript">
        <p class="post-title" v-if="item.title">{{item.title}}</p>
        <p class="post-hint" v-if="item.hint">{{item.hint}}</p>
      </div>
      <div class="post-img" v-if="item.images">
        <img :src="imgPath+item.images[0]" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
  import port from '@/api/proxyPort'
  export default {
    props: {
      story: Array,
    },
    data(){
      return {
        imgPath: port.imgPath,
      }
    },
    methods: {
      goPage(id){
        console.log(port.imgPath)
        this.$router.push({
          path: `newsDetail/${id}`
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/newsItem.scss';
</style>