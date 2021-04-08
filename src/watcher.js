import traverse from './traverse.js'
import vm from './data.js'

// 数据监听
export default class Watcher {
  constructor(path, cb, option) {
    this.cb = cb;
    this.depIds = new Set();
    this.deps = [];
    this.getter = parsePath(path);
    this.value = this.get();
    if (option && option.immediate) this.cb(this.value);
    if (option) {
      this.deep = option ? !!option.deep : false;
    }
  }

  // 取值
  get() {
    window.target = this;
    let value = this.getter(vm);
    if (this.deep) traverse(value);
    window.target = undefined;
    return value;
  }

  // 记录依赖
  addDep(dep) {
    if (!this.depIds.has(dep.id)) {
      dep.dep.push(this);
      this.depIds.add(dep.id);
      this.deps.push(dep);
    }
  }

  // 更新视图
  update() {
    const oldValue = this.value;
    const newValue = this.get();
    this.cb(newValue, oldValue);
  }
}

// 根据路径得到值，path形如：data.info.job
function parsePath(path) {
  let pathArray = path.split('.');
  // obj为对象
  return (obj) => {
    let value = JSON.parse(JSON.stringify(obj));
    for (let i = 0; i < pathArray.length; i++) {
      if (value[pathArray[i]]) value = value[pathArray[i]]
    }
    return value;
  }
}