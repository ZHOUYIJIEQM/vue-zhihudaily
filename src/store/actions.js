import api from '@/api'

export default {
  // 获取最新文章
  getNewsLatest({state, commit}){
    return api.getLatest().then(res => {
      // console.log('最新文章\n', JSON.stringify(res, null, '  '));
      commit('setSwiperStories', res.top_stories);
      commit('setTodayStories', res.stories);
      commit('setDate', res.date);
    });
  },
  // 某天文章
  getNewsBefore({state, commit}){
    let date = '';
    if(state.beforeStories.length === 0){
      date = state.date;
    }else{
      date = state.beforeStories[state.beforeStories.length-1].date;
    }
    return api.getBeforeById(date).then(res => {
      // console.log('往期文章：', res)
      commit('addBeforeStories', res)
    })
  },
  // 获取对应文章短评(点赞, 短评数量)
  getExtra({state, commit}, id){
    return api.getStoryExtraById(id).then(res => {
      // console.log(res)
      commit('setStoryExtra', res)
    })
  },

}