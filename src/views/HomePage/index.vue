<template>
  <div class="home-page" v-show="!refreshing">
    <!-- 头部 -->
    <div class="daily-header">
      <dailyHeader @click.native="goTop" @showSidebar="toggleSidebar"></dailyHeader>
    </div>
    
    <!-- 滚动区域 -->
    <div class="wrapper" ref="wrapper">
      <div class="content">
        <div class="down-refresh">
          <bottomLoading :loading="downRefresh" :loadingText="`正在刷新...`"></bottomLoading>
        </div>
        <div class="main-page" v-if="pageShow === 'homepage'">
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
        <div class="sections-page" v-else-if="pageShow === 'sections'">
          <newsItem :story="sectionById"></newsItem>
        </div>
        <bottomLoading :loading="loading"></bottomLoading>
      </div>
    </div>

    <transition name="fadeLeft">
      <div class="sidebar-menu" v-show="sidebarIsShow">
        <sidebarMenu @handleSideMenu="handleSideMenu"></sidebarMenu>
      </div>
    </transition>
    <div class="sidebar-mask" @click="toggleSidebar" v-show="sidebarIsShow"></div>

  </div>
</template>
<script>
  import {mapState, mapMutations, mapActions} from 'vuex'
  import api from '@/api'
  import BScroll from 'better-scroll'

  export default {
    components: {
      dailyHeader: () => import('@/components/Header'),
      dailySwiper: () => import('@/components/Swiper'),
      bottomLoading: () => import('@/components/BottomLoading'),
      newsItem: () => import('@/components/NewsItem'),
      sidebarMenu: () => import('@/components/sidebarMenu')
    },
    data(){
      return {
        scroll: null,
        loading: false,
        downRefresh: false,
        sidebarIsShow: false,
        isFirstEnter: false,
        pageShow: 'homepage',
        sectionById: [],
      }
    },
    computed: {
      ...mapState(['todayStories', 'beforeStories', 'refreshing'])
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
    beforeRouteLeave (to, from, next) {
      if(to.name === 'newsDetail'){
        this.setRefreshing(true);
      }
      next();
    },
    methods: {
      ...mapActions(['getNewsLatest', 'getNewsBefore', ]),

      ...mapMutations(['clearBeforeStories', 'setRefreshing']),
      
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
        this.loading = true
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
            this.loadBefore();
            setTimeout(()=>{
              this.setRefreshing(false);
            }, 500)
            this.$nextTick(() => {
              this.scroll = new BScroll(this.$refs.wrapper, {
                click: true,
                scrollY: true,
                probeType: 3,
                bounceTime: 350,
                mouseWheel: {
                  speed: 20,
                  invert: false,
                  easeTime: 300
                },
                pullUpLoad: {
                  threshold: 200, // 在上拉到距离底部 60px 时，触发 pullingUp 事件
                },
                pullDownRefresh: {
                  threshold: 30, // 当下拉到超过顶部 30px 时，触发 pullingDown 事件
                  stop: 30 // 刷新数据的过程中，回弹停留在距离顶部还有 25px 的位置
                },
              });

              let upDebounce = null;
              this.scroll.on('pullingUp', () => {
                
                // 事件防抖
                upDebounce && clearTimeout(upDebounce);
                if(!this.loading){
                  upDebounce = setTimeout(this.loadBefore, 300);
                }
                this.scroll.finishPullUp();
              });

              let downDebounce = null;
              this.scroll.on('pullingDown', () => {
                this.downRefresh = true
                // 事件防抖
                downDebounce && clearTimeout(downDebounce);
                downDebounce = setTimeout(this.pullDown, 300);
              });

            });
          });
        }
      },

      handleSideMenu(str){
        // console.log(str)
        if(str === 'homepage'){
          this.pageShow = 'homepage';
          this.toggleSidebar();
        }else if(str.page === 'sections'){
          api.getSectionById(str.id).then(res => {
            this.pageShow = 'sections';
            console.log(res)
            this.sectionById = res.stories;
            this.toggleSidebar();
          });
        }
      }
    } 
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/homePage.scss';
</style>