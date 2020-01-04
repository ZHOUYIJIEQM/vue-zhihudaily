import port from '@/api/proxyPort'
import Vue from 'vue'
import {Toast} from 'mint-ui'

export const HANDLERIMG = str => {
  let reg = new RegExp("http(s{0,1})\:\/\/pic", "g")
  return str.replace(reg, `${port.imgPath}http://pic`);
}

export const HANDLERTIME = num => {
  let time = new Date(+num);
  let ctime = time.toLocaleString();
  // console.log(ctime.substring(5, ctime.length))
  return ctime.substring(5, ctime.length);

}

export const COPY = str => {
  // 获取要复制的链接地址
  let copyStr = str;
  // 创建一个input并加到body里，把要复制的值放到它的value
  let oInput = document.createElement('input');
  oInput.value = copyStr;
  document.body.appendChild(oInput);
  // 选取input的内容
  oInput.select();
  // 执行复制命令
  let copyResult = document.execCommand('copy');
  // 移除添加进去的input
  document.body.removeChild(oInput);
  if(copyResult){
    Toast({
      message: '已复制到剪切板！',
      iconClass: 'iconfont icon-zhihu',
      duration: 1000
    });
  }else{
    Toast({
      message: '复制失败！',
      iconClass: 'iconfont icon-zhihu',
      duration: 1000
    });
  }
}