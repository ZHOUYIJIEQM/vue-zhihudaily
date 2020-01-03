import port from '@/api/proxyPort'

export const HANDLERIMG = str => {
  let reg = new RegExp("http(s{0,1})\:\/\/pic", "g")
  return str.replace(reg, `${port.imgPath}http://pic`);
}


