<template>
	<view><view class="btn" @click="goto()">二维码生成</view></view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		goto() {
			console.log('ssss')
			uni.navigateTo({
				url:"/pages/template/Xcord/Xcord"
			})
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
