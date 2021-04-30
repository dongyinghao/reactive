import Observer from './observer.js'
import Watcher from './Watcher.js'
import { set } from './set.js'
import vm from './data.js'
import { moment } from './util.js'

parseToDom();

// 模板编译
function parseToDom() {
  const ele = document.querySelector('#app');
  let html = `
    <div class="flex mt-20">
        <div class="w-150">姓名:</div><div>${vm.data.name}</div>
    </div>
     <div class="flex mt-20">
        <div class="w-150">时间格式转化:</div><div>${moment().format('YYYY年M月D日 h:m:s')}</div>
    </div>
    <div class="flex mt-20">
        <div class="w-150">测试:</div><div>${vm.data.test || '--'}</div>
    </div>
    <div class="flex mt-20">
        <div class="w-150">性别:</div><div>${vm.data.gender}</div>
    </div>
    <div class="flex mt-20">
        <div class="w-150">年龄:</div><div>${vm.data.age}</div>
    </div>
    <div class="flex mt-20">
        <div class="w-150">工作:</div><div>${vm.data.info.job}</div>
    </div>
    <div class="flex mt-20">
        <div class="w-150">电话:</div><div>${vm.data.info.tell}</div>
    </div>
    <div class="flex ai-c mt-20">
        <div class="w-150">家庭成员:</div>
        <div class="flex">`;
    vm.data.family.forEach(item => {
      html += `<div class="item">${item.name}</div>`
    });
   html += `</div></div>`;
  ele.innerHTML = html;
}

new Observer(vm);

new Watcher('data', (n, o) => {
  parseToDom()
}, { deep: true, immediate: true });

let j = 0;
document.querySelector('#age').addEventListener('click', () => {
    --vm.data.age
});
document.querySelector('#add').addEventListener('click', () => {
    vm.data.family.push({
        name: '米花' + j++,
        age: 0,
        gender: '女',
        info: {
            job: '婴儿',
            tell: '-/-',
            hobby: 'eat',
            homeTown: '重庆市南岸区涂山镇'
        }
    });
});
document.querySelector('#minus').addEventListener('click', () => {
    vm.data.family.splice(vm.data.family.length - 1, 1)
});
document.querySelector('#job').addEventListener('click', () => {
  vm.data.info.job = vm.data.info.job === '教师' ? '测量员' : '教师';
  if (!vm.data.test) {
    set(vm.data, 'test', '哈哈');
  } else {
    vm.data.test = Math.random().toFixed(2);
  }
});
