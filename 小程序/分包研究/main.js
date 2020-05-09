import Vue from 'vue'
import App from './App'

import PubFuc from "./common/stime"



Vue.config.productionTip = false
Vue.prototype.$pubFuc = PubFuc



App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
