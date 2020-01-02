<template>
  <div class="today-post" v-if="story.length>0">
    <div class="post-outer" v-for="(item, index) in story" :key="index" @click="goPage(item.id)">
      <div class="descript">
        <p class="post-title" v-if="item.title">{{item.title}}</p>
        <p class="post-hint" v-if="item.hint">{{item.hint}}</p>
      </div>
      <div class="post-img" v-if="item.images">
        <img :src="imgPath+item.images" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      story: Array,
    },
    data(){
      return {
        imgPath: 'http://127.0.0.1:8011/img/',
      }
    },
    methods: {
      goPage(id){
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