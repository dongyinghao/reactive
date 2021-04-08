import Dep from './dep.js'
import { arrayMethods, methods } from './arrayMethods.js'

// 观察者
export default class Observer {
  constructor(value) {
    this.dep = new Dep();
    Object.defineProperty(value, '_ob_', {
      value: this,
      writable: false,
      configurable: true,
      enumerable: false
    });
    if (typeof value === "object" && value.constructor === Array) { // 数组
      if (value.__proto__) {
        value.__proto__ = arrayMethods;
      } else {
        methods.forEach(key => {
          Object.defineProperty(value, key, {
            value: arrayMethods[key],
            writable: true,
            configurable: true,
            enumerable: true
          })
        })
      }
      for (let i = 0; i < value.length; i++) {
        if (typeof value[i] === 'object') new Observer(value[i]);
      }
    } else { // 对象
      const keys = Object.keys(value);
      for (let i = 0; i < keys.length; i++) {
        definedReactive(value, keys[i], value[keys[i]])
      }
    }
  }
}

// 创建响应式数据
function definedReactive(target, key, value) {
  let childObserver = undefined;
  if (value instanceof Array) childObserver = observer(value);
  let dep = new Dep();
  if (typeof value === 'object' && !value._ob_) {
    new Observer(value);
  }
  Object.defineProperty(target, key, {
    get() {
      // 普通对象的依赖收集
      dep.depend();
      // 数组的依赖收集(因为数组的依赖收集器存放在Observer里面)
      if (childObserver) {
        childObserver.dep.depend();
      }
      return value
    },
    set(newValue) {
      value = newValue;
      dep.notify();
    },
    configurable: true,
    enumerable: true
  })
}

function observer(value) {
  if (typeof value !== 'object') return;
  if (value._ob_ && value._ob_ instanceof Observer) {
    return value._ob_;
  } else {
    return new Observer(value);
  }
}
