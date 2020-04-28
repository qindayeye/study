<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="inputLine">
			<view class="inputLabel">出生日期</view>
			<view class="inputData">
				<lyzml-datepicker ref="lyzmlDatePicker" :config="datePickerConfig" @onDateChange="onBirthDayChange"></lyzml-datepicker>
			</view>
		</view>
		<button @tap="setInitDate()">手动设置日期</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				childBirthday: "",
			}
		},
		computed: {
			datePickerConfig: function() {
				let retObj = {
					yearsBefore: 15,
					yearsAfter: 0,
					initType: "ym",
					initDate:"2019-01"
				};
				return retObj;
			}
		},
		onLoad() {
			// this.setInitDate()
		},
		methods: {
			onBirthDayChange(e) {
				this.childBirthday = e.value;
			},
			setInitDate(){
				 this.$refs.lyzmlDatePicker.initDate("全部");
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50upx;
	}
</style>
