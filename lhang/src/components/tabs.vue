<template>
	<div class="tabs_common">
		<!--{{question}}-->
		<div v-for="tab in tabs" v-on:click="test1()">
			<router-link :to='tab.to'>
				<img :src='tab.to == tag ? tab.img_s:tab.img_h'>
				<p :class="tab.to == tag ? 'a_h' : 'a_s' ">{{tab.name}}</p>
			</router-link>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'tabs',
		props: {
			question: {
				type: String,
				default: '222'
			}
		},
		//		props: {
		//			tag: {
		//				type: String,
		//				default: '/capital'
		//			},
		//			tabs: {
		//				type: Array,
		//				default: [{
		//					name: '交易中心1',
		//					img_s: './static/imgs/tab1s.png',
		//					img_h: './static/imgs/tab1h.png',
		//					to: '/capital'
		//				}, {
		//					name: '资金管理',
		//					img_s: './static/imgs/tab2s.png',
		//					img_h: './static/imgs/tab2h.png',
		//					to: '/market'
		//				}, {
		//					name: '个人中心',
		//					img_s: './static/imgs/tab3s.png',
		//					img_h: './static/imgs/tab3h.png',
		//					to: '/personal'
		//				}]
		//			}
		//		},
		data() {
			return {
				tag: '',
				tabs: [{
					name: '交易中心',
					img_s: './static/imgs/tab1s.png',
					img_h: './static/imgs/tab1h.png',
					to: '/capital'
				}, {
					name: '资金管理',
					img_s: './static/imgs/tab2s.png',
					img_h: './static/imgs/tab2h.png',
					to: '/market'
				}, {
					name: '个人中心',
					img_s: './static/imgs/tab3s.png',
					img_h: './static/imgs/tab3h.png',
					to: '/personal'
				}]
			}
		},
		mounted() {
			let that = this;
			this.tag = this.$route.path != '/' ? this.$route.path : '/capital';
			//console.log(this.tag)
			setInterval(function() {
				that.$emit('input', 111)
				that.$emit('inputee', 222)
			}, 1000)
		},
		methods: {
			test1: function() {
				//console.log(this.tag)
			}
		},
		watch: {
			// 如果 question 发生改变，这个函数就会运行
			question: function(newQuestion) {
				//console.log(newQuestion)
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
	.tabs_common {
		width: 100%;
		height: 50px;
		position: fixed;
		bottom: 0px;
		border-top: 1px solid silver;
		z-index: 0;
		div {
			height: 100%;
			float: left;
			width: 33.333333333%;
			img {
				height: 32px;
			}
			p {
				margin: 0;
				font-size: 12px;
			}
			a {
				text-decoration: none;
			}
			.a_s {
				color: black;
			}
			.a_h {
				color: #387ef5;
			}
		}
	}
</style>