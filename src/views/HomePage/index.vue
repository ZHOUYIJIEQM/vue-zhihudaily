<template>
  <div class="home-page">
    <!-- 头部 -->
    <dailyHeader @click.native="goTop"></dailyHeader>
    <!-- 左右移动加载动画 -->
    <div class="loading" v-if="refreshing">
      <span class="left"></span>
      <span class="middle"></span>
      <span class="right"></span>
    </div>
    <!-- 滚动区域 -->
    <div class="wrapper" ref="wrapper">
      <div class="content">
        <div class="main-page">
          <dailySwiper></dailySwiper>
          <div class="post">
            <!-- 今日 -->
            <div class="today-list">
              <newsItem :story="todayStories"></newsItem>
            </div>
            <!-- 往期 -->
            <div class="news-before" v-for="(item, index) in beforeStories" :key="index">
              <div class="daily-date">
                <span>{{item.date.substr(4, 2)}}</span><span>月</span>
                <span>{{item.date.substr(6, 2)}}</span><span>日</span>
              </div>
              <newsItem :story="item.stories"></newsItem>
            </div>
            <bottomLoading :loading="loading"></bottomLoading>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState, mapMutations, mapActions} from 'vuex'
  import BScroll from 'better-scroll'

  export default {
    components: {
      dailyHeader: () => import('@/components/Header'),
      dailySwiper: () => import('@/components/Swiper'),
      bottomLoading: () => import('@/components/BottomLoading'),
      newsItem: () => import('@/components/NewsItem'),
    },
    data(){
      return {
        refreshing: true,
        scroll: null,
        loading: false,
        sidebarIsShow: false,
        isFirstEnter: false,
      }
    },
    computed: {
      ...mapState(['todayStories', 'beforeStories', ])
    },
    created(){
      this.isFirstEnter = true;
    },
    activated(){
      if(!this.$route.meta.isBakc || this.isFirstEnter){
        this.loadDate();
      }
      this.$route.meta.isBakc = false;
    },
    beforeRouteEnter(to, from, next){
      if(from.name === 'newsDetail'){
        to.meta.isBakc = true;
      }
      next();
    },
    methods: {
      ...mapActions(['getNewsLatest', 'getNewsBefore', ]),

      ...mapMutations(['clearBeforeStories', ]),
      
      goTop(){
        console.log('goTop')
      },

      toggleSidebar(){
        this.sidebarIsShow = !this.sidebarIsShow;
      },

      loadBefore(){
        console.log('上拉加载！');
        this.getNewsBefore().then(() => {
          this.$nextTick(() => {
            this.loading = false;
            this.scroll.refresh();
          });

        });
      },

      loadDate(){
        if(!this.scroll){
          this.getNewsLatest().then(() => {
            this.refreshing = false;
            this.loadBefore();
            this.$nextTick(() => {
              this.scroll = new BScroll(this.$refs.wrapper, {
                click: true,
                scrollY: true,
                bounceTime: 300,
                swipeBounceTime: 300,
                mouseWheel: {
                  speed: 20,
                  invert: false,
                  easeTime: 300
                },
                pullUpLoad: {
                  threshold: -10, // 在上拉到超过底部 30px 时，触发 pullingUp 事件
                },
                pullDownRefresh: {
                  threshold: 50, // 当下拉到超过顶部 50px 时，触发 pullingDown 事件
                  // stop: 20 // 刷新数据的过程中，回弹停留在距离顶部还有 20px 的位置
                },
              });

              
              let upDebounce = null;
              this.scroll.on('pullingUp', () => {

                this.loading = true;


                // 事件防抖
                upDebounce && clearTimeout(upDebounce);
                upDebounce = setTimeout(this.loadBefore, 500);

                this.scroll.finishPullUp();
                
              });



            });
          });
        }
      }
    } 
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/homePage.scss';
</style>