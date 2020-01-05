# zhihudaily
用vue, vue-router, vuex, axios写的移动版知乎日报,主要包括了日报的每日推荐,日报各个栏目。
组件包括了轮播,首页头部,侧边栏,分享模块,加载提示,文章底部条,文章列表。
因为知乎的api限制跨域,所以用node写了个代理,项目运行前需要先运行代理:
```
node proxy.js
```

## 运行

``` 
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 预览图片:  
### 首页  
![首页](https://img2018.cnblogs.com/common/1277192/202001/1277192-20200105214920391-307701776.png)

![首页](https://img2018.cnblogs.com/common/1277192/202001/1277192-20200105215138158-1655002237.png)
### 上拉加载
![上拉加载](https://img2018.cnblogs.com/common/1277192/202001/1277192-20200105215231275-714419613.png)
### 下拉刷新
![下拉刷新](https://img2018.cnblogs.com/common/1277192/202001/1277192-20200105215301590-12369431.png)
### 侧边栏
![侧边栏](https://img2018.cnblogs.com/common/1277192/202001/1277192-20200105215443322-37446755.png)
### 文章页面
![文章页面](https://img2018.cnblogs.com/common/1277192/202001/1277192-20200105215522194-661978304.png)
### 文章分享
![文章分享](https://img2018.cnblogs.com/common/1277192/202001/1277192-20200105215552648-1786731908.png)
### 评论页面
![评论页面](https://img2018.cnblogs.com/common/1277192/202001/1277192-20200105215629586-2008079177.png)