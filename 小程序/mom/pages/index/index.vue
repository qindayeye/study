<template>
	<view class="content">
		<view class="logo"></view>
		<view class="sale">
			<view class="saleitem" :class="[i > 1 ? 'saleitem1' : '']" v-for="i in 3" :key="i">
				<view class="salelogo">
					<view class="yuan">
						<view class="shang">SALE</view>
						<view class="xia">秒杀</view>
					</view>
					<view class="title">每人仅限1瓶</view>
				</view>
				<image src="@/static/mm.jpg" mode=""></image>
				<view class="saleY">
					<view class="saledsc">深层卸妆呵护肌肤</view>
					<view class="saletitle">防水彩妆轻松卸</view>
					<view class="qian">
						<view class="xiananjia">75</view>
						<view class="yuanjia">￥29</view>
						<view class="btn">立即秒杀>></view>
					</view>
					<view class="salename">韩国因之谜税金防晒喷雾</view>
				</view>
			</view>
		</view>
		<view class="xiatitle"></view>
		<view class="hot">
			<view class="hotitem" v-for="i in 2" :key="i">
				<view class="hotlog">
					<view class="hotlogN"><view class="hotlogNa">热门推荐</view></view>
				</view>
				<image src="@/static/mm.jpg" mode=""></image>
				<view class="hotdsc">全球网红爆款</view>
				<view class="hottitle">黑头毛孔隐形高招</view>
				<view class="hotxia">
					<view class="xiaZ">
						<view class="yuanjia">原价：68</view>
						<view class="huiyuanj">超级会员价:56</view>
					</view>
					<view class="xiananjia">45</view>
					<view class="btn">立即购买</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: 'Hello'
		};
	},
	onLoad() {},
	methods: {}
};
</script>

<style lang="scss">
.content {
	// height: 2522rpx;
	width: 750rpx;
	background: url(@/static/mom.png) no-repeat;
	background-size: 750rpx;
	.logo {
		height: 850rpx;
		width: 750rpx;
	}
	.sale {
		height: 880rpx;
		width: 680rpx;
		background-color: #ffffff;
		// border-radius: 20rpx;
		margin: 25rpx auto;
		.saleitem1::after {
			content: '';
			position: absolute;
			top: -2rpx;
			left: 6rpx;
			height: 2rpx;
			width: 665rpx;
			border-top: 1px dashed #f08080;
		}
		.saleitem {
			height: 33%;
			width: 100%;
			display: flex;
			justify-content: space-around;
			align-items: center;
			position: relative;
			.salelogo {
				z-index: 10;
				height: 120rpx;
				width: 140rpx;
				position: absolute;
				top: 10rpx;
				left: 5rpx;

				.yuan {
					margin-left: 10rpx;
					height: 100rpx;
					width: 100rpx;
					color: #ffffff;
					background-color: #f08080;
					border-radius: 50%;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					font-size: 35rpx;
					.shang {
						margin-bottom: -10rpx;
					}
				}
				.title {
					font-size: 25rpx;
					color: #f08080;
				}
			}
			image {
				margin-left: 50rpx;
				height: 85%;
				width: 40%;
			}
			.saleY {
				height: 85%;
				width: 50%;
				display: flex;
				justify-content: space-around;
				align-items: center;
				flex-direction: column;
				.saledsc {
					color: #f08080;
					font-size: 28rpx;
					height: 48rpx;
					border: 1rpx solid #f08080;
					width: 260rpx;
					border-radius: 25rpx;
					text-align: center;
					line-height: 48rpx;
				}
				.saletitle {
					color: #f08080;
					font-size: 35rpx;
				}
				.qian {
					width: 90%;
					display: flex;
					align-items: flex-end;
					justify-content: space-between;
					.xiananjia {
						margin-bottom: -2rpx;
						font-size: 50rpx;
						font-weight: 600;
						color: #f08080;
						position: relative;
					}
					.xiananjia::after {
						font-size: 26rpx;
						color: #f08080;
						content: '￥';
						position: absolute;
						bottom: 8rpx;
						left: -22rpx;
					}
					.yuanjia {
						margin-left: -15rpx;
						font-size: 28rpx;
						color: #696969;
						text-decoration: line-through;
					}
					.btn {
						height: 40rpx;
						width: 150rpx;
						background-color: #f08080;
						color: #ffffff;
						text-align: center;
						font-size: 25rpx;
						line-height: 40rpx;
						border-radius: 18rpx;
					}
				}
				.salename {
					background-color: #f08080;
					color: #ffffff;
					font-size: 26rpx;
					height: 40rpx;
					width: 300rpx;
					text-align: center;
					line-height: 40rpx;
				}
			}
		}
	}
	.xiatitle {
		height: 145rpx;
	}
	.hot {
		height: 610rpx;
		width: 100%;
		background-color: #ffffff;
		display: flex;
		justify-content: space-around;
		align-items: center;
		.hotitem {
			height: 590rpx;
			width: 357rpx;
			border: 5rpx solid #f08080;
			display: flex;
			justify-content: space-around;
			align-items: center;
			flex-direction: column;
			position: relative;
			.hotlog {
				z-index: 10;
				position: absolute;
				top: 20rpx;
				left: 20rpx;
				height: 100rpx;
				width: 100rpx;
				border-radius: 50%;
				background-color: #f08080;
				color: #ffffff;
				display: flex;
				justify-content: center;
				align-items: center;
				.hotlogN {
					height: 80rpx;
					width: 80rpx;
					border-radius: 50%;
					border: 1rpx #ffffff dashed;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.hotlogNa {
					height: 70rpx;
					width: 70rpx;
					font-size: 28rpx;
					text-align: center;
					line-height: 35rpx;
				}
			}
			image {
				margin-top: 50rpx;
				height: 50%;
				width: 80%;
			}
			.hotdsc {
				color: #f08080;
				font-size: 40rpx;
				font-weight: 500;
				margin-bottom: -10rpx;
			}
			.hottitle {
				margin-bottom: 10rpx;
				color: #000;
				font-size: 32rpx;
			}
			.hotxia {
				color: #ffffff;
				height: 100rpx;
				width: 95%;
				background-color: #e8626d;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.xiaZ {
					margin-left: 10rpx;
					height: 80%;
					width: 50%;
					display: flex;
					justify-content: center;
					align-items: flex-start;
					flex-direction: column;
					.yuanjia {
						font-size: 22rpx;
						text-decoration: line-through;
					}
					.huiyuanj {
						font-size: 22rpx;
					}
				}
				.xiananjia {
					margin-right: -10rpx;
					font-size: 48rpx;
					font-weight: 600;
					position: relative;
				}
				.xiananjia::after {
					font-size: 26rpx;
					color: #ffffff;
					content: '￥';
					position: absolute;
					bottom: 8rpx;
					left: -25rpx;
				}
				.btn {
					// padding: 20rpx 0;
					font-size: 26rpx;
					width: 20%;
					text-align: center;
					background-color: #ff888f;
					height: 80rpx;
					padding-top: 20rpx;
					line-height: 34rpx;
				}
			}
		}
	}
}
</style>
