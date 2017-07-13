<template>
	<div class="bind_google">
		<!--<div class="st_t1">绑定谷歌验证器</div>-->
		<div class="container">
			<div class="bind_box" v-for="i in googleList">
				<input class="ipt_text" type="text" :placeholder="i.hint" readonly/>
				<span class="hint_msg">({{i.type}}) 谷歌验证器</span>
				<a v-if="i.status == '1'" class="btn" href="javascript:void(0)" @click="toggle(i.items[0])">绑定</a>
				<a v-if="i.status == '2'" class="btn" href="javascript:void(0)" @click="toggle(i.items[1])">重置</a>
				<a v-if="i.status == '0'" class="btn gray" href="javascript:void(0)">未启用</a>
			</div>
			<div class="how_to_use">
				<p class="title"><span>*</span>如何安装谷歌验证器</p>
				<ul>
					<li>
						<span>iPhone手机</span>
						<p>在App Stroe中搜索Google Authenticator</p>
						<a href="https://itunes.apple.com/cn/app/google-authenticator/id388497605?mt=8"  target="_blank"  class="btn">下载</a>
					</li>
					<li>
						<span>Android手机</span>
						<p>在安卓应用市场中所搜"谷歌身份验证器",或搜索Google Authenticator</p>
						<a href="http://shouji.baidu.com/software/3832652.html" target="_blank" class="btn">下载</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import setList from './set_google.js'
	export default {
		data() {
			return {
				googleList: setList.google_list_init(),
				setGoogle: true,
			}
		},
		components: {},
		computed: {
			user() {
				return this.$store.getters.getUser;
			},
		},
		methods: {
			toggle(data) {
				this.$router.push({
					path: '/user/settings/' + data
				})
			},
		},
		mounted() {
			this.googleList = setList.get_data(this.user);
		},
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.bind_google {
		font-size: 13px;
		margin-bottom: 70px;
		text-align: left;
		.st_t1 {
			padding: 15px 20px;
			background: #f4f4f4;
			width: 100%;
			font-size: 24px;
		}
		.container {
			/*border: 1px solid #efefef;*/
			padding: 39px 0;
			.btn {
				display: inline-block;
				width: 82px;
				height: 40px;
				line-height: 40px;
				background: #0093F1;
				color: #fff;
				text-align: center;
				position: absolute;
				right: 18px;
				top: 14px;
				border-radius: 3px;
				&:hover{
					background: #26a8fb;
				}
				&:active{
					background: #0084d9;
				}

			}
			.gray {
				background: #ccc;
			}
			.bind_box {
				width: 850px;
				height: 68px;
				margin-left: 53px;
				position: relative;
				margin-bottom: 27px;
				.ipt_text {
					width: 850px;
					height: 68px;
					padding: 0 150px 0 300px;
					border: 1px solid #cbcbcb;
				}
				.hint_msg {
					position: absolute;
					left: 26px;
					top: 22px;
					font-size: 16px;
				}
			}
			.how_to_use {
				.title {
					margin: 55px 0 38px 71px;
					span {
						color: #0093F1;
					}
				}
				ul {
					margin-left: 53px;
					li {
						width: 850px;
						margin-bottom: 50px;
						position: relative;
						color: #5c6368;
						span {
							display: inline-block;
							margin-left: 30px;
							width: 100px;
						}
						p {
							display: inline-block;
						}
						.btn {
							top: -10px;
						}
					}
				}
			}
		}
	}
</style>