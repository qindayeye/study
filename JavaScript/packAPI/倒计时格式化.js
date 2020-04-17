//   格式化时间
const formatTime = function (num) {
    let second = 0    //秒数
    let minute = 0  // 分钟
    let hour = 0    // 小时
    let day = 0    // 天数
    second = num % 60; // 计算秒数
    if (second.toString().length < 2) {
        second = '0' + second
    }
    // console.log(second)
    let SumMinute = Math.floor(num / 60) // 对数进行下舍入，计算总分钟数
    // console.log(SumMinute, '总分钟数')
    if (SumMinute > 60) { //如果总分钟数大于60
        minute = SumMinute % 60 // 计算最终分钟数
        if (minute.toString().length < 2) {
            minute = '0' + minute
        } else {
            minute = minute
        }
        let SumHour = Math.floor(SumMinute / 60) // 下行舍入，计算总小时数
        // console.log(SumHour, '总小时数')
        if (SumHour > 24) { // 如果时间大于24小时
            hour = SumHour % 24  // 计算最终小时数
            if (hour.toString().length < 2) {
                hour = '0' + hour
            }
            day = Math.floor(SumHour / 24)
        }
    } else { // 总时间小于60分钟
        if (SumMinute.toString().length < 2) {
            minute = '0' + SumMinute
        } else {
            minute = SumMinute
        }

    }
    console.log(day + '天' + hour + ':' + minute + ':' + second)
}
// for(let i=1314520;i>0;i++){
//     formatTime(i)
// }
let num = 1314600
setInterval(() => {
    formatTime(num)
    num--
}, 1000)