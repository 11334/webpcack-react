import Two from './two.js'
const test = (num) => {
    console.log("测试箭头函数 @babel/preset-env" + num);
}
test(Two.y);
function testable(target) {
    target.isTestable = true;
}
@testable
class MyTestableClass { }
console.log("装饰器语法", MyTestableClass.isTestable) // true
