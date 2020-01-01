export default {
  setSwiperStories(state, data){
    // console.log('设置轮播文章', data);
    state.swiperStories = data;
  },
  setTodayStories(state, data){
    // console.log('设置今日文章', data);
    state.todayStories = data;
  },
  setDate(state, data){
    // console.log('设置请求的日期', data);
    state.date = data;
  },
  setStoryExtra(state, data){
    // console.log('设置额外评论', data);
    state.storyExtra = data;
  },
  addBeforeStories(state, data){
    // console.log('设置往日的文章', data);
    state.beforeStories.push(data);
  },
  clearBeforeStories(state){
    state.beforeStories = [];
  },
  
}