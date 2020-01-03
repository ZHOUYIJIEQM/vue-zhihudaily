<template>
  <div class="home-page">
    <!-- 头部 -->
    <div class="daily-header">
      <dailyHeader @click.native="goTop"></dailyHeader>
    </div>
    <!-- 左右移动加载动画 -->
    <div class="loading" v-if="refreshing">
      <span class="left"></span>
      <span class="middle"></span>
      <span class="right"></span>
    </div>
    <!-- 滚动区域 -->
    <div class="wrapper" ref="wrapper">
      <div class="content">
        <div class="down-refresh">
          <bottomLoading :loading="downRefresh" :loadingText="`正在刷新...`"></bottomLoading>
        </div>
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
          </div>
        </div>
        <bottomLoading :loading="loading"></bottomLoading>
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
        downRefresh: false,
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
        to.meta.isBack = true;
      } 
      next();
    },
    methods: {
      ...mapActions(['getNewsLatest', 'getNewsBefore', ]),

      ...mapMutations(['clearBeforeStories', ]),
      
      goTop(){
        if(this.scroll){
          this.scroll.scrollTo(0, 0, 500);
        }
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

      pullDown(){
        // this.clearBeforeStories();
        console.log('下拉刷新！');
        this.getNewsLatest().then(() => {
          this.downRefresh = false;
          this.clearBeforeStories();
          this.loadBefore();
          this.scroll.refresh();
          this.scroll.finishPullDown();
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
                probeType: 3,
                mouseWheel: {
                  speed: 20,
                  invert: false,
                  easeTime: 300
                },
                pullUpLoad: {
                  threshold: 120, // 在上拉到距离底部 60px 时，触发 pullingUp 事件
                },
                pullDownRefresh: {
                  threshold: 30, // 当下拉到超过顶部 30px 时，触发 pullingDown 事件
                  stop: 25 // 刷新数据的过程中，回弹停留在距离顶部还有 25px 的位置
                },
              });

              let upDebounce = null;
              this.scroll.on('pullingUp', () => {
                this.loading = true;
                // 事件防抖
                upDebounce && clearTimeout(upDebounce);
                upDebounce = setTimeout(this.loadBefore, 200);
                this.scroll.finishPullUp();
              });

              let downDebounce = null;
              this.scroll.on('pullingDown', () => {
                this.downRefresh = true
                // 事件防抖
                downDebounce && clearTimeout(downDebounce);
                downDebounce = setTimeout(this.pullDown, 200);
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