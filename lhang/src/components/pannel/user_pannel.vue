<template>
	<div class="news_pannel">
		<ion-content12>
			<div>
				<img class="message" src="/src/views/homepage/pannel/latest_news/img/message.png"/>
				最新消息：{{content}}
				<a>更多...</a>
			</div>
		</ion-content>
	</div>
</template>

<script>
	export default {
		name: 'login_pannel',
		data() {
			return {
				content: "宝宝是新闻组件",
			}
		},
		components: {
		}, //这里注册
		methods: {
		},
		mounted() {
			var that = this;
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
	.news_pannel{
		height: 80px;
		line-height: 80px;
		font-size: 14px;
		.message{
			width: 18px;
			height: 18px;
			position: relative;
			top: 4px;
		}
	}
</style>
