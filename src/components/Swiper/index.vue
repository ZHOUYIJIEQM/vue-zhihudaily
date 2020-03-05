<template>
  <swiper id="swiper" :options="swiperOption" v-if="swiperStories.length > 0">
    <swiper-slide class="slide" v-for="(slide, index) in swiperStories" :key="index">
      <!-- <router-link :to="{ name: 'newsDetail', params: { id: slide.id } }"> -->
        <div class="mask" style="color: white;"></div>
        <img v-if="slide.image" :src="imgPath+slide.image" alt="" class="img" />
        <div class="title">
          <div class="post-title">{{slide.title}}</div>
          <div class="post-hint">{{slide.hint}}</div>
        </div>
      <!-- </router-link>  -->
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>
<script>

  import port from '@/api/proxyPort'
  import api from '@/api'

  export default {

    data(){
      let self = this;
      return {
        swiperOption: {
          loop: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
          paginationClickable: true,
          pagination: {
            el: '.swiper-pagination'
          },
          nested: true,
          on: {
            tap: function(){
              var realIndex = this.realIndex;
              self.toNewsDetail(self.swiperStories[realIndex].id);
            }
          }
        },
        imgPath: port.imgPath, // 图片使用代理地址
        swiperStories: [],
      }
    },

    mounted(){
      api.getLatest().then(res => {
        this.swiperStories = res.top_stories;
        this.$store.commit('setRefreshing', false);
      })
    },

    methods: {
      toNewsDetail(id){
        this.$router.push({
          path: `newsDetail/${id}`
        });
        this.$store.commit('setNewsDetailId', id);
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/swipe.scss';
</style>
<style lang="scss">
  // 不能写在scoped里面
  .swiper-container-horizontal>.swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction {
    bottom: 0.313rem;
    left: 70%!important;
    position: absolute;
    width: 30%!important;
    .swiper-pagination-bullet{
      margin: 0 2.5px;
    }
  }
  .swiper-pagination {
    // position: absolute;
    // bottom: 0.31rem;
    right: 0;
    text-align: right;
    padding-right: 0.35rem;
    transition: 300ms opacity;
    // transform: translate3d(0, 0, 0);
    z-index: 10;

    .swiper-pagination-bullet {
      width: 0.125rem;
      height: 0.125rem;
      display: inline-block;
      margin: 0 0.1rem;
      border-radius: 0.125rem;
      background: #fff!important;
      opacity: 0.5;
      transition: all 0.25s;
    }

    .swiper-pagination-bullet-active {
      width: 0.5rem;
      opacity: 0.9;
    }
  }
</style>