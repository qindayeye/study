<template>
	<view>
		<view class="qrimg-i">
			<tki-qrcode cid="qrcode1" ref="qrcode" :val="val" :size="size" :unit="unit" :icon="icon" :iconSize="iconsize" :lv="lv" :onval="onval" :loadMake="loadMake" :usingComponents="true"/>
		</view>
	</view>
</template>

<script>
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
	export default {
		components: {
			tkiQrcode
		},
		data() {
			return {
				val: 'http://www.baidu.com', // 要生成的二维码值
				size: 300, // 二维码大小
				unit: 'upx', // 单位
				icon: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJszxSFjZnCM6ax1TKq02reBVLvmohUnHbRVWsZBow1rP589aaliaNNf9TVHxOiaytVQrKa1qLhibb5Q/132', // 二维码图标
				iconsize: 40, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: false, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				src: '', // 二维码生成后的图片地址或base64
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="stylus">
	.qrimg-i
		height 300rpx
		width 300rpx
		margin 20rpx auto
</style>
