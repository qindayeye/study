// [{
//     goods_id: 4507,
//     goods_img: "享",
//     goods_name: "享阅年卡",
//     color: "#FFB9A0"
// },
// {
//     goods_id: 4508,
//     goods_img: "超",
//     goods_name: "超级年卡",
//     color: "#EBBE91"
// },
// {
//     goods_id: 4298,
//     goods_img: "月",
//     goods_name: "无限月卡",
//     color: "#FFB4B4"
// },
// {
//     goods_id: 1858,
//     goods_img: "季",
//     goods_name: "无限季卡",
//     color: "#FFDCA0"
// },
// {
//     goods_id: 1859,
//     goods_img: "年",
//     goods_name: "无限年卡",
//     color: "#BED2FF"
// }, {
//     goods_id: 4299,
//     goods_img: "单",
//     goods_name: "单次卡",
//     color: "#A5EBA0"
// }, {
//     goods_id: 4300,
//     goods_img: "5",
//     goods_name: "5次借阅卡",
//     color: "#FFC3F5"
// }, {
//     goods_id: 4301,
//     goods_img: "12",
//     goods_name: "12次借阅卡",
//     color: "#C3B9F5"
// }
// ]




//身份证号
 function idNoFormatCheck(value) {
    var num = value.toUpperCase();
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
    var reg = /^(\d{18,18}|\d{15,15}|\d{17,17}X)$/;
    if (!reg.test(num)) {
        return false;
    }
    // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
    // 下面分别分析出生日期和校验位
    var len, re;
    len = num.length;
    if (len == 15) {
        re = new RegExp(
            /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
        var arrSplit = num.match(re);
        // 检查生日日期是否正确
        var dtmBirth = new Date('19' + arrSplit[2] +
            '/' + arrSplit[3] + '/' + arrSplit[4]);
        var bGoodDay;
        bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) &&
            ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) &&
            (dtmBirth.getDate() == Number(arrSplit[4]));
        if (!bGoodDay) {
            return false;
        }
    }
    if (len == 18) {
        re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
        var arrSplit = num.match(re);
        // 检查生日日期是否正确
        var dtmBirth = new Date(arrSplit[2] + "/" +
            arrSplit[3] + "/" + arrSplit[4]);
        var bGoodDay;
        bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) &&
            ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) &&
            (dtmBirth.getDate() == Number(arrSplit[4]));
        if (!bGoodDay) {
            return false;
        } else {
            // 检验18位身份证的校验码是否正确。
            // 校验位按照ISO 7064:1983.MOD
            // 11-2的规定生成，X可以认为是数字10。
            var valnum;
            var arrInt = new Array(7, 9, 10, 5, 8, 4,
                2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9',
                '8', '7', '6', '5', '4', '3', '2');
            var nTemp = 0,
                i;
            for (var i = 0; i < 17; i++) {
                nTemp += num.substr(i, 1) * arrInt[i];
            }
            valnum = arrCh[nTemp % 11];
            if (valnum != num.substr(17, 1)) {
                return false;
            }
        }
    }
    return true;
}


let  c = '411502199709109199'
let a = idNoFormatCheck(c)
console.log(a)



var nameReg = /^[\u4E00-\u9FA5]{2,4}$/
let b = nameReg.test('迪丽热巴')
console.log(b)