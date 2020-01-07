<template>
  <div class="sidebar">
    <div class="home-page" @click="SelectSections('homepage')" :class="{isActive: isSelect==='homepage'}">
      每日推荐
    </div>
    <p class="home itemSelect" 
      v-show="showHome"
      @click="goHome"
    >首页</p>
    <div class="sections" :class="{isActive: isSelect==='sections'}" @click="SelectSections('sections')">
      日报栏目
      
    </div>
    <ul v-show="showSections">
      <li class="section-item" 
        :class="{itemSelect: item.id === itemId}" 
        v-for="(item, index) in sections"
        @click="showSection(item.id)"
      >
        <div class="pic">
          <img :src="imgPath+item.thumbnail" alt="" />
        </div>
        <div class="title">{{item.name}}</div>
      </li>
    </ul>
  </div>
</template>
<script>
  import port from '@/api/proxyPort'
  import api from '@/api'
  export default {
    data(){
      return {
        sections: [],
        isSelect: 'homepage',
        showHome: false,
        showSections: false,
        gohome: false,
        itemId: null,
        imgPath: port.imgPath
      }
    },
    mounted(){
      this.getSections();
    },
    methods: {
      getSections(){
        api.getSections().then(res => {
          // console.log(res);
          this.sections = res.data;
        })
      },
      goHome(){
        this.gohome=!this.gohome;
        this.showHome = false;
        this.$emit('handleSideMenu', 'homepage');
      },
      showSection(id){
        this.itemId = id;
        let obj = {
          page: 'sections',
          id: id
        }
        this.$emit('handleSideMenu', obj);
      },
      SelectSections(str){
        this.isSelect = str;
        if(str == 'sections'){
          this.showSections = !this.showSections;
          this.showHome = false;
        }else if(str == 'homepage'){
          this.showSections = false;
          this.showHome = !this.showHome;
          this.gohome = false;
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/sidebarMenu.scss';
</style>