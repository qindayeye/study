let time = new Date()
console.log(time);
// console.log(time.getTime()/1000);
// console.log(Math.floor(time.getTime()/1000))
// console.log(time.getHours());
// console.log(time.getMinutes());
// console.log(time.getSeconds());

let arr = [
    '星期天',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六'
]
console.log('今天是'+arr[time.getDay()]);