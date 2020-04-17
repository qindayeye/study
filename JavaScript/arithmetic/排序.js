
// One: 冒泡排序
let arr = [9,3,5,6,8,7,1,16]
function fn(arr) {
    for(let i=0;i<arr.length;i++){
        for(let j=0;j<arr.length;j++){
            if(arr[j]>arr[j+1]){
                let a = arr[j]
                arr[j]=arr[j+1]
                arr[j+1]=a
            }
        }
    }
    console.log(arr)
}   
fn(arr)
// Two: 快速排序







