import axios from 'axios'

/*
  // 最新文章
  http://news-at.zhihu.com/api/4/news/latest
  // 过去某天文章
  http://news.at.zhihu.com/api/4/news/before/${idNum}
  // 短评论内容
  http://news-at.zhihu.com/api/4/story/${idNum}/short-comments
  // 短评论数量 点赞 
  http://news-at.zhihu.com/api/4/story-extra/${idNum}
  // 所有日报栏目
  http://news-at.zhihu.com/api/3/sections
  // 某个栏目
  http://news-at.zhihu.com/api/3/section/${idNum}
*/

const API = {
  latest: '/news/latest',
  before: '/news/before/idNum',
  shortComments: '/story/idNum/short-comments',
  storyExtra: '/story-extra/idNum',
  sections: '/sections',
  section: '/section/idNum',
  apiPath: 'http://127.0.0.1:8010',
  imgPath: 'http://127.0.0.1:8011/img',
};

const ajax = axios.create({
  baseURL: API.apiPath,  
});
// 响应拦截器
ajax.interceptors.response.use(res => {
  // console.log('axios 拦截的数据', res);
  return res.data;
});

function replaceId (url, id) {
  return url.replace(/\/idNum/, `/${id}`);
}

export default {
  // 获取最新文章
  getLatest(){
    return ajax.get(API.latest);
  },
  // 获取往期文章
  getBeforeById(id){
    let url = replaceId(API.before, id);
    return ajax.get(url);
  },
  // 获取某篇文章的短评论
  getShortCommentsById(id){
    let url = replaceId(API.shortComments, id);
    return ajax.get(url);
  },
  // 获取短评论的额外信息，(点赞, 短评数量)
  getStoryExtraById(id){
    let url = replaceId(API.storyExtra, id);
    return ajax.get(url);
  },
  // 获取所有栏目
  getSections(){
    return ajax.get(API.sections);
  },
  // 获取某个栏目
  getSectionById(id){
    let url = replaceId(API.section, id);
    return ajax.get(url);
  }
}