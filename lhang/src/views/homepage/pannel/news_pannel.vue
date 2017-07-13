<template>
	<div class="news_pannel">
		<ion-content12>
			<div class="main">
				<span>
					<img class="message" src="../../../imgs/message.png"/>
					最新消息：
				</span>
				<span class="content">
					<span :class="{ 'content_z': newlist.length>0}">
						<p v-if="newlist.length>0" v-for="item in newlist">{{item.infoTitle}}</p>
						<p style="margin-top: 10px;" v-if="newlist.length==0">---</p>
					</span>
				</span>
				<span>
					<a>更多...</a>
				</span>
			</div>
		</ion-content12>
	</div>
</template>

<script>
	export default {
		name: 'login_pannel',
		data() {
			return {
				content: "宝宝是新闻组件",
				newlist: [],
			}
		},
		components: {}, //这里注册
		methods: {},
		mounted() {
			var that = this;
			setInterval(function() {
				that.newlist = [];
//				that.lh_http('get', "info/typeList", {
//					type: '网站公告'
//				}).done(function(res) {
//					if(res.status) {
//						for(var i in res.data.list.resultList) {
//							if(i < 3) {
//								that.newlist.push(res.data.list.resultList[i]);
//							}
//						}
//					}
//				})
			}, 6000)
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
	.news_pannel {
		height: 80px;
		line-height: 80px;
		font-size: 14px;
		text-align: center;
		.main {
			display: inline-block;
			span {
				float: left;
				p {
					height: 20px;
					line-height: 20px;
					width: 200px;
					text-align: left;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
			.message {
				width: 18px;
				height: 18px;
				position: relative;
				top: 4px;
			}
			.content {
				height: 40px;
				overflow: hidden;
				margin-top: 20px;
				.content_z {
					margin-top: 12px;
					animation: up 6s;
					@keyframes up {
						0% {
							margin-top: 12px;
						}
						33% {
							margin-top: -11px;
						}
						66% {
							margin-top: -29px;
						}
						100% {
							margin-top: -47px;
						}
					}
				}
			}
		}
	}
</style>
