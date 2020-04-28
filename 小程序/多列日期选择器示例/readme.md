说明：为了解决安卓手机上部分手机选择日期时弹出的是默认的日历选择插件，使用起来很不方便，所以自己用<picker mode="multiSelector"></picker>自定义了一个时间选择插件；
使用方法说明：
1、在main.js中引入插件，配置如下
import lyzmldatepicker from './components/lyzml-datepicker/lyzml-datepicker.vue';
Vue.component('lyzml-datepicker',lyzmldatepicker);

2、在需要使用的页面里引用自定义组件
<lyzml-datepicker ref="lyzmlDatePicker" :config="datePickerConfig" @onDateChange="onBirthDayChange"></lyzml-datepicker>

3、设置属性config，默认配置如下
{
	initType: "ymd",   //日期选择框类型，ymd年月日，ym年月
	yearsBefore: 5,    //年份下拉框，当前年往前推5年
	yearsAfter: 5,     //年份下拉框，当前年往后推5年，如当前年份为2019年，则默认配置可选年范围为2014~2024年
	initDate:""        //默认选中的日期，需与initType对应
}

4、如需手动更改日期，可调用组件的方法initDate
this.$refs.lyzmlDatePicker.initDate("2019-10-01");