<template>
	<view class="content">
		<!-- 标题 -->
		<view class="title">智能花托</view>
		<!-- 花托列表 -->
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
				<view class="dscBottom">
					<progress
						class="prog"
						show-info="true"
						border-radius="8"
						backgroundColor="#DCDCDC"
						:percent="[(item.newvalue - item.init) / item.water] * 100"
						activeColor="#00FF00"
						stroke-width="16"
					/>
				</view>
			</view>
			<view class="delete"><image src="../../static/det.png" mode=""></image></view>
		</view>
		<!-- 添加按钮 -->
		<image @click="darwer()" class="addbtn" src="../../static/jrsj.png" mode=""></image>
		<!-- 添加表单 -->
		<view class="addmask" @click.stop="darwer()" v-if="isdarwer">
			<view class="addform" @click.stop="ss()">
				<view class="itemView">
					名称：
					<input class="input" name="userName" placeholder="请输入设备名称" :value="newfloter.name" />
				</view>
				<view class="itemView">
					参数：
					<input class="input" name="userName" placeholder="请输入设备参数" :value="newfloter.parameter" />
				</view>
				<view class="itemView">
					设备ID：
					<input class="input" name="userName" placeholder="请输入设备ID" :value="newfloter.ID" />
				</view>
				<view class="itemView">
					api-key：
					<input class="input" password placeholder="请输入api-key" :value="newfloter.apikey" bindinput="passWdInput" />
				</view>
				<view class="btnfloor">
					<view class="btnflooritem" @click="submit('1',newfloter)">添加</view>
					<view class="btnflooritem" @click.stop="darwer()">取消</view>
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
				parameter: 'Weight_Shiwu'
			},
			flowerList: [
				//花托列表
				{
					name: '白百何',
					apikey: 'N4Hi4scsutQWHiUhVf=y10S6zj4=',
					ID: 577429787,
					init: 60, // 初始重量
					newvalue: 99, // 实时重量
					water: 40 // 最近一次浇水的量
				}
			],
			isdarwer: false
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
		submit(index,flower){
			uni.request({
				url: "https://api.heclouds.com/devices/" + flower.ID + "/datapoints",
				method: 'GET',
				header:{
					'api-key':flower.apikey
				},
				data: {
					limit:10,
					parameter:flower.parameter
				},
				success: res => {
					console.log(res)
				},
				fail: (err) => {
					console.log(err)
				},
				complete: () => {}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
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
			height: 450rpx;
			width: 100%;
			background-color: #ffffff;

			.itemView {
				padding-left: 10rpx;
				height: 88rpx;
				width: 100%;
				display: flex;
				justify-content: flex-start;
				align-items: center;

				.input {
					width: 75%;
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
