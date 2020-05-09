<template>
	<view>
		<view class="btn iconfont icon-scanQR" @click="goto('/pages/template/Xcord/Xcord')">二维码生成</view>
		<view class="btn iconfont icon-privacy_closed" @click="goto('/pages/template/video/video')">视频播放器</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		goto(url) {
			console.log('ssss');
			uni.navigateTo({
				url
			});
		}
	}
};
</script>

<style lang="stylus" scoped>
.btn
	margin 10rpx auto
	height 66rpx
	width 400rpx
	border #007AFF solid 1rpx
	border-radius 33rpx
	font-size 33rpx
	text-align center
	line-height 66rpx
</style>
