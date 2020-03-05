<template>
  <header class="header">
    <div class="menu">
      <i class="icon-htmal5icon35 iconfont" @click.stop="$emit('showSidebar')"></i>
    </div>
    <div class="date">
      <div class="d">{{setDate}}</div>
      <div class="m">{{months[setMonth]}}</div>
    </div>
    <div class="life-tips">{{lifeTips}}</div>
    <div class="heads-pic">
      <span class="iconfont icon-zhihu"></span>
    </div>
  </header>
</template>
<script>
  export default {
    data(){
      return {
         months: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
         setDate: 0,
         setMonth: 0,
         nowtime: 0,
         lifeTips: "",
      }
    },
    methods: {
      getDate(){
        var date = new Date();
        this.setMonth = date.getMonth();
        this.setDate = date.getDate();
        this.nowtime = date.getHours();
        if(this.nowtime>=22 || this.nowtime <= 3){
          this.lifeTips = '早点休息~';
        }else if (this.nowtime>4 && this.nowtime<=8) {
          this.lifeTips = '早上好~';
        }else if (this.nowtime>11 && this.nowtime <= 13) {
          this.lifeTips = '中午好~';
        }else if (this.nowtime>15 && this.nowtime <= 17) {
          this.lifeTips = '下午好~';
        }else if (this.nowtime>18 && this.nowtime <= 21) {
          this.lifeTips = '晚上好~';
        }else{
          this.lifeTips = '知乎日报'
        }
      },
      
    },
    mounted(){
      this.getDate();
    }

  }
</script>
<style lang="scss" scoped>
  @import '@/styles/dailyHeader.scss';
</style>