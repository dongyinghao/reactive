// 依赖存储器
let depIdx = 0;
export default class Dep {
    constructor () {
        this.id = depIdx++;
        this.dep = []
    }
    // 依赖收集
    depend () {
        if (window.target && this.dep.indexOf(window.target) === -1) {
            window.target.addDep(this)
        }
    }
    // 通知依赖
    notify () {
        this.dep.forEach(item => {
            item.update()
        })
    }
}
