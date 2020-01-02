<template>
  <swiper id="swiper" :options="swiperOption" v-if="swiperStories.length > 0">
    <swiper-slide class="slide" v-for="(slide, index) in swiperStories" :key="index">
      <!-- <router-link :to="{ name: 'newsDetail', params: { id: slide.id } }"> -->
        <div class="mask" style="color: white;"></div>
        <img :src="imgPath+slide.image" alt="" class="img" />
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
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import {mapState} from 'vuex'

  export default {
    components: {swiper, swiperSlide},
    computed: {
      ...mapState(['swiperStories'])
    },
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
          on: {
            tap: function(){
              var realIndex = this.realIndex;
              self.toNewsDetail(self.swiperStories[realIndex].id);
            }
          }
        },
        imgPath: 'http://127.0.0.1:8011/img/', // 图片使用代理地址
      }
    },
    methods: {
      toNewsDetail(id){
        this.$router.push({
          path: `newsDetail/${id}`
        });
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