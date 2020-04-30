<template>
	<view class="invitee">
		<view class="headerbg"></view>
		<view class="headerTitel">
			<navigator class="cell-icon yticon icon-zuo" open-type="navigateBack"></navigator>
			<h4>佣金结算</h4>
			<!-- 空标签  占位符 -->
			<text class="cell-icon yticon icon-zuo" style="color:rgba(255,255,255,0);"></text>
		</view>
		<view class="scee">
			<view class="stitle">可结算佣金(人)</view>
			<view class="peocon">838</view>
			<view class="explain">每月10日(含)以后即可申请结算上月全部佣金</view>
			<view class="des">
				<view class="desitem">
					<view class="des_title">待结算佣金(元)</view>
					<view class="des_count">2285</view>
				</view>
				<view class="desitem">
					<view class="des_title">总收入(元)</view>
					<view class="des_count">998285</view>
				</view>
			</view>
			<view class="btn">
				<view class="btn1" @click="gotoUrl()">结算记录</view>
				<view class="btn2" @click="gotoTX()">佣金结算</view>
			</view>
			<view class="bank" @click="gotoCard()">
				<view class="bankZ">
					<image src="http://ktoss.oss-cn-beijing.aliyuncs.com/app_image/bank.png" mode=""></image>
					<view class="bankName">我的银行卡</view>
				</view>
				<view class="bankY">
					您还未添加结算银行卡
					<text style="margin-top: 5rpx; color: #888888;" class="yticon icon-you"></text>
				</view>
			</view>
		</view>
		<view class="Ztitle">
			<view class="title">
				<image src="https://ktoss.oss-cn-beijing.aliyuncs.com/app_image/pageicon.png" mode=""></image>
				<text>佣金明细</text>
			</view>
			<view class="select" @click="isshowtop()">
				{{clip}}
				<text class="xia yticon icon-xia"></text>
			</view>
		</view>
		<view class="inviList">
			<view class="listItem" v-for="i in 8" :key="i">
				<view class="listItemZ">
					<image src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJszxSFjZnCM6ax1TKq02reBVLvmohUnHbRVWsZBow1rP589aaliaNNf9TVHxOiaytVQrKa1qLhibb5Q/132" mode=""></image>
					<view class="message">
						<view class="name">无线年卡</view>
						<view class="time">2020-04-23</view>
					</view>
				</view>
				<view class="listItemY"><view class="money">￥1555</view></view>
			</view>
		</view>
		<view class="bto">已经是我的底线了哦</view>
		<view class="bottomTob" v-if="showTop">
			<view class="tobdsc">
				<view class="tobTOP">
					<view class="cancel" @click="IFtop(1)">取消</view>
					<view class="confirm" @click="IFtop(2)">确定</view>
				</view>
				<view class="tobX">
					<picker-view class="tobX" indicator-style="height:40rpx" :value="value" @change="bindChange">
						<picker-view-column>
							<view class="picker-item" v-for="(item, index) in years" :key="index">{{ item }}</view>
						</picker-view-column>
						<picker-view-column>
							<view class="picker-item" v-for="(item, index) in months" :key="index">{{ item }}</view>
						</picker-view-column>
						<!-- 	<picker-view-column>
							<view class="picker-item" v-for="(item, index) in days" :key="index">{{ item }}日</view>
						</picker-view-column> -->
					</picker-view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		const date = new Date();
		const years = [];
		const year = date.getFullYear();
		const months = [];
		const month = date.getMonth() + 1;
		const days = [];
		const day = date.getDate();
		for (let i = 2019; i <= date.getFullYear(); i++) {
			years.push(i);
		}
		for (let i = 1; i <= 12; i++) {
			months.push(i);
		}
		for (let i = 1; i <= 31; i++) {
			days.push(i);
		}
		return {
			clip: '全部',
			childBirthday: '',
			isQuan: false,
			showTop: false,
			years,
			year,
			months,
			month,
			days,
			day,
			value: [9999, month - 1, day - 1],
		};
	},

	methods: {
		gotoTX() {
			uni.navigateTo({
				url: '../TiXian/TXorder'
			});
		},
		gotoCard() {
			uni.navigateTo({
				url: '../TiXian/MyCard'
			});
		},
		gotoUrl() {
			uni.navigateTo({
				url: '../TiXian/TXrecord'
			});
		},
		IFtop(index) {
			if (index == 1) {
				// 取消
				console.log('取消le');
			} else if (index == 2) {
				// 确定
				this.clip = this.year+'-'+this.month;
			}
			this.isshowtop();
		},
		isshowtop() {
			this.showTop = !this.showTop;
		},
		bindChange: function(e) {
			// console.log(e.detail.value)
			const val = e.detail.value;
			this.year = this.years[val[0]];
			this.month = this.months[val[1]];
			this.day = this.days[val[2]];
			console.log(this.year+'-'+this.month)
		}
	}
};
</script>

<style lang="scss" scoped>
.headerbg {
	z-index: -5;
	position: absolute;
	top: 0;
	left: 0;
	width: 750rpx;
	height: 434rpx;
	background: linear-gradient(135deg, rgba(255, 165, 127, 1) 0%, rgba(255, 82, 82, 1) 100%);
}
.invitee {
	position: relative;
	z-index: 9;
	.headerTitel {
		padding: 0 30rpx;
		background: rgba(255, 255, 255, 0);
		font-size: 34rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		/* #ifdef MP */
		margin-top: 88rpx;
		/* #endif */	
		height: 88rpx;
		width: 750rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.scee {
		z-index: 999;
		padding: 60rpx 0 0 0;
		margin: 20px auto;
		width: 710rpx;
		height: 608rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 2rpx 22rpx 0rpx rgba(0, 0, 0, 0.1);
		border-radius: 10rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-direction: column;
		.stitle {
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(102, 102, 102, 1);
			text-align: center;
		}
		.peocon {
			font-size: 48rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: rgba(51, 51, 51, 1);
			text-align: center;
		}
		.explain {
			width: 650rpx;
			height: 48rpx;
			background: rgba(255, 245, 230, 1);
			border-radius: 24rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(210, 155, 130, 1);
			line-height: 48rpx;
			text-align: center;
		}
		.des {
			width: 480rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 20rpx;
			.desitem {
				.des_title {
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
					text-align: center;
				}
				.des_count {
					text-align: center;
					font-size: 32rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: rgba(51, 51, 51, 1);
				}
			}
		}
		.btn {
			width: 100%;
			display: flex;
			justify-content: space-around;
			align-items: center;
			.btn1 {
				width: 310rpx;
				height: 88rpx;
				background: rgba(255, 255, 255, 1);
				border-radius: 49px;
				border: 1px solid rgba(255, 130, 75, 1);
				box-shadow: 0px 2rpx 6rpx 0rpx rgba(255, 205, 120, 0.5);
				border-radius: 49rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: rgba(255, 130, 75, 1);
				line-height: 88rpx;
				text-align: center;
			}
			.btn2 {
				width: 310rpx;
				height: 88rpx;
				background: linear-gradient(135deg, rgba(254, 163, 100, 1) 0%, rgba(250, 108, 58, 1) 100%);
				box-shadow: 0px 2rpx 6rpx 0rpx rgba(255, 205, 120, 0.5);
				border-radius: 49rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				line-height: 88rpx;
				text-align: center;
			}
		}
		.bank {
			margin-top: 60rpx;
			height: 88rpx;
			width: 710rpx;
			background: rgba(255, 255, 255, 1);
			border-top: 1rpx solid #e6e6e6;
			padding: 0 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.bankZ {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				image {
					width: 34rpx;
					height: 26rpx;
				}
				.bankName {
					margin-left: 20rpx;
					font-size: 30rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
				}
			}
			.bankY {
				height: 80rpx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #ff824b;
			}
		}
	}
	.Ztitle {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.title {
			height: 88upx;
			background: #f5f5f5;
			line-height: 88rpx;
			box-sizing: border-box;
			padding-left: 20rpx;
			// padding-top: 10rpx;
			image {
				width: 22upx;
				height: 26upx;
				margin-right: 10rpx;
			}
			text {
				font-size: 34rpx;
				font-weight: 600;
				color: rgba(51, 51, 51, 1);
				line-height: 48rpx;
			}
		}
		.select {
			margin-right: 20rpx;
			padding: 0 20rpx;
			text-align: center;
			line-height: 48rpx;
			height: 48rpx;
			background: rgba(255, 255, 255, 1);
			border-radius: 24rpx;
			border: 1rpx solid rgba(230, 230, 230, 1);
			font-size: 26rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(102, 102, 102, 1);
			.xia {
				font-size: 26rpx;
				color: rgba(102, 102, 102, 1);
				text-align: center;
				line-height: 56rpx;
				height: 48rpx;
			}
		}
	}

	.inviList {
		margin: 5rpx auto;

		width: 710rpx;
		background: rgba(255, 255, 255, 1);
		border-radius: 10px;
		.listItem {
			position: relative;
			padding: 0 20rpx;
			width: 710rpx;
			height: 148rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.listItemZ {
				height: 148rpx;
				display: flex;
				justify-content: flex-start;
				align-items: center;

				image {
					width: 90rpx;
					height: 90rpx;
					border-radius: 50%;
					margin-right: 20rpx;
				}
				.message {
					.name {
						font-size: 30rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: rgba(51, 51, 51, 1);
					}
					.time {
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: rgba(153, 153, 153, 1);
					}
				}
			}
			.listItemY {
				display: flex;
				justify-content: center;
				align-items: flex-end;
				flex-direction: column;
				.money {
					font-size: 35rpx;
					color: #fa6c3a;
				}
				.msg {
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
				}
			}
		}
		.listItem::after {
			content: '';
			position: absolute;
			bottom: 1rpx;
			right: 0;
			background-color: #e6e6e6;
			height: 1rpx;
			width: 580rpx;
			z-index: 99;
		}
	}
	.bto {
		height: 50rpx;
		text-align: center;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(153, 153, 153, 1);
		line-height: 50rpx;
	}
	.bottomTob {
		z-index: 999999;
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 750rpx;
		background: rgba(0, 0, 0, 0.6);
		.tobdsc {
			position: absolute;
			left: 0;
			bottom: 0;
			width: 750rpx;
			height: 471rpx;
			background-color: #ffffff;
			border-top-left-radius: 20rpx;
			border-top-right-radius: 20rpx;
			.tobTOP {
				padding: 0 40rpx;
				height: 88rpx;
				width: 750rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 30rpx;
				font-weight: 500;
				.cancel {
					color: #000;
				}
				.confirm {
					color: #6495ED;
				}
			}
			.tobX {
				border-top: 1rpx solid #c0c4cc;
				width: 750rpx;
				height: 345rpx;
				background: rgba(255, 255, 255, 1);

				.picker-item {
					text-align: center;
					line-height: 40px;
					font-size: 16px;
				}
			}
		}
	}
}
</style>
