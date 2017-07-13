<template>
	<div class="depth-echar">
		<div id="main_depth" style="padding: 0 15px;width: 810px;height:183px;"></div>
	</div>
</template>

<script>
	import echarts from 'echarts';
	import store from '../../../vuex/store'
	import depth from './depth'
	export default {
		data() {
			return {
				option_depth: {},
				myChart_depth: {},
				show_tag: true,
				new: '',
				old: ''
			}
		},
		computed: {
			sub_spot_btc_cny_depth_d() {
				if(this.$store.getters.sub_spot_btc_cny_depth_d){
					return this.$store.getters.sub_spot_btc_cny_depth_d.data;
				}
			},
			sub_spot_zec_cny_depth_d() {
				if(this.$store.getters.sub_spot_zec_cny_depth_d) {
					return this.$store.getters.sub_spot_zec_cny_depth_d.data;
				}
			},
			sub_spot_eth_cny_depth_d() {
				if(this.$store.getters.sub_spot_eth_cny_depth_d) {
					return this.$store.getters.sub_spot_eth_cny_depth_d.data;
				}
			},
			sub_spot_etc_cny_depth_d() {
				if(this.$store.getters.sub_spot_etc_cny_depth_d) {
					return this.$store.getters.sub_spot_etc_cny_depth_d.data;
				}
			}
		},
		methods: {
			subscribes() {
				var currencys  = ['btc','zec','eth','etc'];
				for(var i of currencys) {
					if(i == this.$route.params.type) {
						store.dispatch('send', {
							channel: 'sub_spot_' + i + '_cny_depth_d',
							depth: 0
						})
					}else {
						store.dispatch('send', {
							channel: 'sub_spot_' + i + '_cny_depth_d',
							depth: 0,
							isClose: true,
						})
					}
				}
			},
		},
		mounted() {
			this.option_depth = depth.get_option;
			this.myChart_depth = echarts.init(document.getElementById('main_depth'));
			this.subscribes();
			var that = this;
			setInterval(function() {
				that.show_tag = true;
			}, 2500)
		},
		watch: {
			sub_spot_btc_cny_depth_d: function(val) {
				if(this.$route.params.type == 'btc') {
					if(this.show_tag) {
						this.option_depth = depth.get_data(val);
						this.myChart_depth.setOption(this.option_depth);
						this.show_tag = false;
					}
				}
			},
			sub_spot_zec_cny_depth_d: function(val) {
				if(this.show_tag) {
					if(this.$route.params.type == 'zec') {
						this.option_depth = depth.get_data(val);
						this.myChart_depth.setOption(this.option_depth);
						this.show_tag = false;
					}
				}
			},
			sub_spot_eth_cny_depth_d: function(val) {
				if(this.show_tag) {
					if(this.$route.params.type == 'eth') {
						this.option_depth = depth.get_data(val);
						this.myChart_depth.setOption(this.option_depth);
						this.show_tag = false;
					}
				}
			},
			sub_spot_etc_cny_depth_d: function(val) {
				if(this.show_tag) {
					if(this.$route.params.type == 'etc') {
						this.option_depth = depth.get_data(val);
						this.myChart_depth.setOption(this.option_depth);
						this.show_tag = false;
					}
				}
			},
			'$route' (to, from) {
				this.myChart_depth = echarts.init(document.getElementById('main_depth'));
				this.new = to.params.type;
				this.old = from.params.type;
				this.subscribes();
			}
		}
	};
</script>

<style lang="scss">
	.depth-echar {
		position: relative;
		top: -20px;
	}
</style>
