// 格式化时间
// time支持格式时间戳、2020-04-13、2020/10/01、2020-04-13 13:26:19、2020/10/01 13:26
class sillyDate {
  constructor(time) {
    this.t = time;
    const weekMap = ['日', '一', '二', '三', '四', '五', '六'];
    if (this.t && this.t.indexOf && this.t.indexOf('-') > -1) this.t = this.t.replace(/-/g, '/');
    const date = this.t ? new Date(this.t) : new Date();
    this.timestamp = date.getTime();
    this._moment = {
      YYYY: date.getFullYear(),
      MM: sillyDate.fixPrev(date.getMonth() + 1),
      M: date.getMonth() + 1,
      DD: sillyDate.fixPrev(date.getDate()),
      D: date.getDate(),
      hh: sillyDate.fixPrev(date.getHours()),
      h: date.getHours(),
      mm: sillyDate.fixPrev(date.getMinutes()),
      m: date.getMinutes(),
      ss: sillyDate.fixPrev(date.getSeconds()),
      s: date.getSeconds(),
      week: weekMap[date.getDay()]
    };
  }
  // format支持格式：YYYY-MM-DD、M/D、YYYY年MM月DD日 hh时mm分ss秒...
  format (format) {
    return format.replace(/(YYYY|MM|M|DD|D|hh|h|mm|m|ss|s)/g, (a) => this._moment[a]);
  }
  static fixPrev (n) {
    return n < 10 ? '0' + Number(n) : n
  }
}
// 日期格式转化器
export function moment(time) {
  return new sillyDate(time);
}

// 获取乘客类型(3-成人、2-儿童、1-婴儿)
export function personType (id) {
  if (!/(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(id)) return 0;
  const cardNo = id.toString();
  const YYYY = cardNo.slice(6, 10);
  const MM = cardNo.slice(10, 12);
  const DD = cardNo.slice(12, 14);
  const nowTimestamp = Date().now();
  const infantTimestamp = new Date((Number(YYYY) + 2) + '/'+ MM +'/'+ DD).getTime();
  const childTimestamp = new Date((Number(YYYY) + 12) + '/'+ MM +'/'+ DD).getTime();
  if (nowTimestamp > childTimestamp) return 3;
  if (nowTimestamp > infantTimestamp) return 2;
  return 1
}

// 防抖
export const debounce = (fn, delay) =>{
    let timer = null;
    return (...args) => {
        clearTimeout(timer);
        timer= setTimeout(() =>{
            fn.apply(this,args)
        },delay)
    }
};

// 节流
export const throttle = (func, delay) => {
  let prev = Date.now();
  return (...args) => {
    let now = Date.now();
    if (now - prev >= delay) {
      func.apply(this, args);
      prev = Date.now();
    }
  }
};

// 长路径取值(避免因取不到值而报错)
export const get = (data, path, initialValue) => {
  const _path = path.replace(/\[(\d+)\]/g, '.' + '$1');
  const args = _path.split('.');
  let _data = data;
  for (let i = 0; i < args.length; i++) {
    if (!_data[args[i]]) {
      _data = initialValue || _data[args[i]];
      break
    } else {
      _data = _data[args[i]]
    }
  }
  return _data;
};
