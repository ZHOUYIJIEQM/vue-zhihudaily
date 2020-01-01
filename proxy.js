const http = require('http');
const request = require('request');

const hostName = '127.0.0.1';
// const port = 8010;
// const imgPort = 8011;
const port = 8010;
const imgPort = 8011;

// 创建http服务器
const apiServer = http.createServer((req, res) => {
  // 每次接收到一个请求时触发。
  const url = 'http://news-at.zhihu.com/api/4' + req.url;
  console.log('请求:', url);
  const options = {
    url: url
  };
  function callback (error, response, body) {
    if(!error && response.statusCode === 200){
      res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end(body);
    }
  }
  request.get(options, callback);
});
apiServer.listen(port, hostName, () => {
  console.log(`代理运行在: http://${hostName}:${port}`);
});

// 图片代理
const imgServer = http.createServer((req, res) => {
  const url = req.url.split('/img/')[1];
  console.log('图片代理:', url);
  const options = {
    url: url,
    encoding: null
  };
  function callback(error, response, body){
    if(!error && response.statusCode === 200){
      const contentType = response.headers['content-type'];
      // console.log('response.headers', contentType);
      res.setHeader('Content-Type', contentType);
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end(body);
    }
  }
  request.get(options, callback);
});
imgServer.listen(imgPort, hostName, () => {
  console.log(`图片代理运行在: http://${hostName}:${imgPort}`);
})