// 重写数组方法，以收集依赖
const methods = ['splice', 'sort', 'pop', 'reverse', 'shift', 'unshift', 'push'];
const originMethods = Array.prototype;
const arrayMethods = Object.create(originMethods);
methods.forEach(key => {
  Object.defineProperty(arrayMethods, key, {
    value(...args) {
      originMethods[key].apply(this, args)
      this._ob_.dep.notify();
    },
    writable: true,
    enumerable: true,
    configurable: true
  })
});

export {
  arrayMethods,
  methods
}
