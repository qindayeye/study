
// 1 通过JSON对象

let deepCopy = function (obj) {
    let str = JSON.stringify(obj) //将对象转换为json字符串形式
    let result =JSON.parse(str)  // 将转换而来的字符串转换为原生的js对象
    return result;
}

// 2 用递归的方法
function deepClone(obj) {
    let result = typeof  obj.splice === "function" ? [] : {}; // 数组有splice方法，对象没有
    if (obj && typeof obj === 'object') {
        for (let key in obj) {
            if (obj[key] && typeof obj[key] === 'object') {
                result[key] = deepClone(obj[key]);//如果对象的属性值为object的时候，递归调用deepClone,即在吧某个值对象复制一份到新的对象的对应值中。
            } else {
                result[key] = obj[key];//如果对象的属性值不为object的时候，直接复制参数对象的每一个键值到新的对象对应的键值对中。
            }

        }
        return result;
    }
    return obj;
}

let obj={a:'ww'}
let result = typeof obj.splice

console.log(result)







