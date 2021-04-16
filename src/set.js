import { definedReactive } from './observer.js'

export function set(target, key, value) {
  if (typeof target === 'object') {
    if (target instanceof Array) { // 数组
      target.splice(key, i, value);
      return value;
    } else { // 对象
      if (key in target && !(key in Object.prototype)) {
        target[key] = value;
        return value;
      }
      if (!target._ob_) { // 普通数据
        target[key] = value;
        return value;
      }
      definedReactive(target, key, value);
      target._ob_.dep.notify();
      return value
    }
  }
}
