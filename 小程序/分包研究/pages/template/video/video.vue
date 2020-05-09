<template>
	<view class="KVmengB">
		<view class="video">
			<video
				id="myVideo"
				:src="src"
				style="width: 750rpx"
				:initial-time="nowmiao"
				vslide-gesture
				@fullscreenchange="fullscreenchange"
				:show-center-play-btn="controls"
				:controls="controls"
				autoplay
				@timeupdate="timeupdate"
				@play="ifPlay()"
				@pause="ifPause()"
			></video>
		</view>
		<view class="floor">
			<view class="lineAll">
				<slider
					class="line"
					:value="nowmiao"
					min="0"
					:max="allmiao"
					@change="sliderChange"
					backgroundColor="#3e3b3f"
					block-color="#FFFFFF"
					block-size="11"
					activeColor="#7e7b7f" />
				<view class="playtime">
					<view class="time">{{ nowmiaoForc }}</view>
					<view class="time"><text v-if="surplus>0">-</text> {{ allmiaoForc }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			src: '',
			danmuValue: '',
			nowmiao: 0, //当前时间
			allmiao: 0, //全部时间
			surplus:0, // 剩余时间
			lineBarWid: 599, //进度条的宽度跟css一只
			isPaly: false,
			controls: true
		};
	},
	computed: {
		width: function() {
			return 'width:' + (this.nowmiao / this.allmiao) * this.lineBarWid + 'upx';
		},
		playWidth: function() {
			return 'transform:translate3d(' + (this.nowmiao / this.allmiao) * this.lineBarWid + 'upx,0,0);';
		},
		nowmiaoForc: function() {
			return this.$pubFuc.secondFormact(this.nowmiao);
			console.log(this.nowmiao);
		},
		allmiaoForc: function() {
			return this.$pubFuc.secondFormact(this.surplus);
		}
		// bgStyle:function (){
		// 	// return 'background-image:url('+this.audioList[this.audioPlaySrc].img+')'
		// }
	},
	created: function(res) {
		// 组件的生命周期不起作用
		// this.videoContext = uni.createVideoContext('myVideo');
		// console.log(this.videoContext, 'iii');
	},
	onLoad(options) { // 监听页面加载
		this.src = options.video_url?options.video_url:'https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4';
		this.nowmiao=uni.getStorageSync('time')?uni.getStorageSync('time'):0
		console.log(this.nowmiao)
		
	},
	onUnload(){ // 监听页面卸载
		uni.setStorageSync('time',this.nowmiao)
		
	},
	onHide() { // 监听页面隐藏
		uni.setStorageSync('time',this.nowmiao)
	},
	onShow() { // 监听页面显示
		console.log('sss')
		this.nowmiao=uni.getStorageSync('time')?uni.getStorageSync('time'):0
		console.log(this.nowmiao)
	},
	onReady: function(res) {
		// 创建视频
		this.videoContext = uni.createVideoContext('myVideo');
		this.videoContext.seek(this.nowmiao)
	},
	methods: {
		
		sliderChange(e) {// 拖动进度条结束时触发
			console.log('value 发生变化：' + e.detail.value);
			this.nowmiao = Math.floor(e.detail.value);
			this.videoContext.seek(e.detail.value);
		},
		// cahnging(e){  // 拖动中实时变化  不可行
		// 	console.log('value 发生变化：' + e.detail.value);
		// 	this.nowmiao = Math.floor(e.detail.value);
		// 	this.videoContext.seek(e.detail.value);
		// },
		fullscreenchange(e) {// 进入和退出全屏时
			console.log(e);
			// this.controls = e.detail.fullscreen;
		},
		ifPlay() {
			// 监听播放
			this.isPaly = true;
		},
		ifPause() {
			//监听暂停
			this.isPaly = false;
		},
		speed(index) {// 快进
			if (index == 1) {
				this.videoContext.seek(this.nowmiao - 15);
			}
			if (index == 2) {
				this.videoContext.seek(this.nowmiao + 15);
			}
		},
		play() {
			if (!this.isPaly) {
				this.isPaly = !this.isPaly;
				this.videoContext.play();
			} else {
				this.isPaly = !this.isPaly;
				this.videoContext.pause();
			}
		},
		back() {
			console.log('跳');
			// this.videoContext.pause()
			uni.navigateBack();
		},
		quanpin() {
			console.log('全屏');
			this.videoContext.requestFullScreen();
		},
		timeupdate(e) {
			if (this.allmiao > 0) {
				// console.log(e.detail.currentTime);
				if(this.nowmiao!==Math.floor(e.detail.currentTime)){
					this.nowmiao = Math.floor(e.detail.currentTime);
					// console.log(this.nowmiao);
				}
				if(this.surplus != this.allmiao-this.nowmiao){
					this.surplus = this.allmiao-this.nowmiao
					// console.log(this.surplus);
				}
				
			} else {
				console.log(Math.ceil(e.detail.duration));
				this.allmiao = Math.floor(e.detail.duration);
				this.surplus = this.allmiao
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.KVmengB {
	background-color: #000000;
	width: 750rpx;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	// z-index: 999;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	
	.video {
		width: 750rpx;
		#myVideo {
			width: 750rpx;
		}
	}
	.floor {
		margin-bottom: 50rpx;
		background-color: #252225;
		height: 170rpx;
		width: 655rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		border-radius: 30rpx;

		.lineAll {
			width: 599upx;
			height: 70rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			.line {
				width: 599upx;
			}
			.playtime {
				margin-top: -20rpx;
				width: 599upx;
				height: 30rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.time {
					height: 30rpx;
					font-size: 24rpx;
					font-weight: 500;
					color: #7e7b7f;
				}
			}
		}
	}
}
</style>

