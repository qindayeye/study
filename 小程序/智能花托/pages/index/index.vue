<template>
	<view class="content">
		<!-- 标题 -->
		<view class="title">智能花托</view>
		<!-- 花托列表 -->
		<view class="kong" v-if="flowerList.length == 0">尚未添加花托</view>
		<view class="flower" v-for="(item, index) in flowerList" :key="index">
			<view class="ONumber">{{ index + 1 }}</view>
			<view class="dsc">
				<view class="dscTop">
					<view class="name">{{ item.name }}</view>
					<view class="weight">
						重量：
						<text class="num">{{ item.newvalue }}</text>
						g
					</view>
				</view>
				<view class="dscBottom" :style="'color:' + item.color">
					<progress class="prog" show-info="true" border-radius="8" backgroundColor="#DCDCDC" :percent="item.percent" :activeColor="item.color" stroke-width="16" />
				</view>
			</view>
			<view class="delete" @click="deleteFlower(index, item)"><image src="../../static/det.png" mode=""></image></view>
		</view>
		<!-- 添加按钮 -->
		<image @click="darwer()" class="addbtn" src="../../static/jrsj.png" mode=""></image>
		<!-- 添加表单 -->
		<view class="addmask" @click.stop="darwer()" v-if="isdarwer">
			<view class="addform" @click.stop="ss()">
				<view class="itemView" style="margin-top: 40rpx;">
					<view class="label">
						名称
						<text></text>
					</view>
					:
					<input class="input" name="userName" placeholder="请输入设备名称" v-model="newfloter.name" />
				</view>
				<view class="itemView">
					<view class="label">
						参数
						<text></text>
					</view>
					:
					<input class="input" name="userName" placeholder="请输入设备参数" v-model="newfloter.parameter" />
				</view>
				<view class="itemView">
					<view class="label">
						设备ID
						<text></text>
					</view>
					:
					<input class="input" name="userName" placeholder="请输入设备ID" v-model="newfloter.ID" />
				</view>
				<view class="itemView">
					<view class="label">
						api-key
						<text></text>
					</view>
					:
					<input class="input" password placeholder="请输入api-key" v-model="newfloter.apikey" bindinput="passWdInput" />
				</view>
				<view class="btnfloor">
					<view class="btnflooritem" style="color: #F08080;" @click="submit(flowerList.length, newfloter)">添加</view>
					<view class="btnflooritem" style="color: #808080;" @click.stop="darwer()">取消</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			newfloter: {
				// 添加新的花托
				name: '白百何',
				apikey: 'N4Hi4scsutQWHiUhVf=y10S6zj4=',
				ID: 577429787,
				parameter: 'Weight_Shiwu',
				inter: '',
				color: '#32CD32',
				percent: 0
			},
			flowerList: [
				//花托列表
				// {
				// 	name: '白百何',
				// 	apikey: 'N4Hi4scsutQWHiUhVf=y10S6zj4=',
				// 	ID: 577429787,
				// 	init: 60, // 初始重量
				// 	newvalue: 99, // 实时重量
				// 	water: 40 // 最近一次浇水的量
				// }
			],
			isdarwer: false,
			colorList: {
				drought: '#B22222', // 缺水
				normal: '#32CD32', // 正常
				moist: '#4169E1' // 水浇多了
			}
		};
	},
	onLoad() {},
	methods: {
		ss() {
			console.log('...');
		},
		darwer() {
			this.isdarwer = !this.isdarwer;
		},
		submit(index, flower) {
			this.startGet(index, flower);

			this.darwer();
		},
		Jpercent(item) {
			if (item.newvalue > item.init) {
				let num = [(item.newvalue - item.init) / item.water] * 100;
				// console.log(num);
				return num.toFixed(2); //百分比保留两位小数
			} else {
				return 0;
			}
		},
		startGet(index, flower) {
			// 第一次获取
			let that = this;
			uni.request({
				url: 'https://api.heclouds.com/devices/' + flower.ID + '/datapoints',
				method: 'GET',
				header: {
					'api-key': flower.apikey
				},
				data: {
					limit: 2,
					datastream_id: flower.parameter,
					start: '2020-04-07T11:01:00'
				},
				success: res => {
					// console.log(res);
					if (res.data.errno == 0) {
						// 请求成功
						// let floweritem = flower
						let deepClone = function(obj) {
							let _tmp = JSON.stringify(obj); //将对象转换为json字符串形式
							let result = JSON.parse(_tmp); //将转换而来的字符串转换为原生js对象
							return result;
						};
						let floweritem = deepClone(flower); // 深拷贝  取消关联
						// {
						// 	name: '白百何',
						// 	apikey: 'N4Hi4scsutQWHiUhVf=y10S6zj4=',
						// 	ID: 577429787,
						// 	init: 60, // 初始重量
						// 	newvalue: 99, // 实时重量
						// 	water: 40 // 最近一次浇水的量
						// };
						floweritem.init = res.data.data.datastreams[0].datapoints[0].value;
						floweritem.newvalue = res.data.data.datastreams[0].datapoints[1].value;
						if (floweritem.newvalue > floweritem.init) {
							//说明浇水了
							floweritem.water = floweritem.newvalue - floweritem.init;
						} else {
							floweritem.water = 0;
						}
						// this.flowerList[index]=floweritem
						floweritem.percent = this.Jpercent(floweritem);
						if (floweritem.percent > 60) {
							// 水浇多了
							floweritem.color = this.colorList.moist;
						} else if (floweritem.percent < 30) {
							//缺水
							floweritem.color = this.colorList.drought;
						} else {
							floweritem.color = this.colorList.normal;
						}
						this.flowerList.push(floweritem);
						that.flowerList[index].inter = setInterval(() => {
							that.getflowerKg(index, floweritem);
						}, 5000); // 每隔5秒请求一次数据
					}
				}
			});
		},
		getflowerKg(index, flower) {
			// 更新数据
			// console.log(index, flower);
			uni.request({
				url: 'https://api.heclouds.com/devices/' + flower.ID + '/datapoints',
				method: 'GET',
				header: {
					'api-key': flower.apikey
				},
				data: {
					limit: 2,
					datastream_id: flower.parameter
				},
				success: res => {
					// console.log(res);
					let floweritem = flower;
					// let deepClone = function(obj) {
					// 	let _tmp = JSON.stringify(obj); //将对象转换为json字符串形式
					// 	let result = JSON.parse(_tmp); //将转换而来的字符串转换为原生js对象
					// 	return result;
					// };
					// let floweritem = deepClone(flower); // 深拷贝  取消关联
					if (res.data.errno == 0) {
						let newf = res.data.data.datastreams[0].datapoints[0].value;
						if (newf > floweritem.newvalue) {
							//说明浇水了
							floweritem.water = newf - floweritem.newvalue; // 浇水的量
							floweritem.init = floweritem.init + floweritem.water * 0.01; // 因浇水花初始重量长了浇水量的1%
							floweritem.newvalue = newf; // 计算结束再赋值
						} else {
							floweritem.newvalue = newf;
						}
						floweritem.percent = this.Jpercent(floweritem);
						if (floweritem.percent > 60) {
							// 水浇多了
							floweritem.color = this.colorList.moist;
						} else if (floweritem.percent < 30) {
							//缺水
							floweritem.color = this.colorList.drought;
						} else {
							floweritem.color = this.colorList.normal;
						}
						let itindex = this.foundI(floweritem.inter);
						this.flowerList[itindex] = floweritem;
						// this.flowerList.push(floweritem)
						this.$forceUpdate(); //由于数组深层改变无法触发相应，需要强制重新渲染
						// console.log(this.flowerList);
					}
				}
			});
		},
		foundI(inter) {
			// 查找当前花的下标
			for (var i = 0; i < this.flowerList.length; i++) {
				if (this.flowerList[i].inter == inter) return i;
			}
			return -1;
		},
		deleteFlower(index, flower) {
			uni.request({
				url: 'http://api.heclouds.com/devices/' + flower.ID + '/datastreams/' + flower.parameter,
				method: 'DELETE',
				header: {
					'api-key': flower.apikey
				},
				success: res => {
					console.log(res);
					// if (res.data.errno == 0) { // ？？？？？删除流一直不成功  没找到原因？？？？？？？？
					// 删除流成功
					// console.log(flower.inter);
					let itindex = this.foundI(flower.inter);
					clearInterval(flower.inter); // 删除定时器
					// console.log(itindex);
					this.flowerList.splice(itindex, 1);
					// }
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	.kong {
		margin-top: 100rpx;
		text-align: center;
		font-size: 40rpx;
		color: #808080;
	}
	.title {
		height: 88rpx;
		width: 100%;
		background-color: #ffffff;
		color: red;
		text-align: center;
		line-height: 88rpx;
		font-size: 34rpx;
		font-weight: 600;
	}
	.flower {
		margin-top: 10rpx;
		background-color: #ffffff;
		height: 150rpx;
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		.ONumber {
			height: 150rpx;
			width: 100rpx;
			font-size: 50rpx;
			font-weight: 600;
			text-align: center;
			line-height: 150rpx;
		}
		.dsc {
			width: 500rpx;
			height: 150rpx;
			.dscTop {
				height: 50%;
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				.name {
					width: 50%;
					font-size: 32rpx;
					font-weight: 600;
					color: #ff6d43;
				}
				.weight {
					font-size: 30rpx;
					font-weight: 500;
					color: #000;
					width: 50%;
					.num {
						font-size: 33rpx;
						color: #ff6d43;
					}
				}
			}
			.dscBottom {
				width: 100%;
				height: 50%;
				color: #00ff00;
			}
		}
		.delete {
			height: 150rpx;
			width: 100rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			> image {
				height: 50rpx;
				width: 50rpx;
			}
		}
	}
	.addbtn {
		height: 60rpx;
		width: 60rpx;
		position: fixed;
		bottom: 100rpx;
		right: 100rpx;
		z-index: 2;
	}
	.addmask {
		height: 100%;
		width: 100%;
		background-color: rgba(00, 00, 00, 0.3);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 3;
		.addform {
			position: absolute;
			bottom: 0;
			left: 0;
			height: 500rpx;
			width: 100%;
			background-color: #ffffff;

			.itemView {
				padding-left: 20rpx;
				height: 88rpx;
				width: 100%;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				.label {
					margin-top: 22px;
					width: 15%;
					font-size: 30rpx;
					text-align: justify;
					text {
						display: inline-block;
						width: 100%;
					}
				}
				.input {
					margin-left: 20rpx;
					padding-left: 15rpx;
					width: 70%;
					border-bottom: 1rpx solid #e6e6e6;
				}
			}
			.btnfloor {
				height: 88rpx;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				.btnflooritem {
					width: 50%;
					height: 88rpx;
					text-align: center;
					line-height: 88rpx;
				}
			}
		}
	}
}
</style>
