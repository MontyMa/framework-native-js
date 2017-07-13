<template>
	<div class="g_page">
		<ol>
			<li v-if="last" @click="go(pageNo-1)"><</li>
			<li v-for="(i,index) in last_list" @click="go(i)">{{i}}</li>
			<li v-if="totalPages > 1" class="current">{{pageNo}}</li>
			<li v-for="(i,index) in next_list" @click="go(i+1)">{{i+1}}</li>
			<li v-if="pageNo < totalPages" @click="go(pageNo+1)">></li>
			<!--<li></li>
			<li>{{totalPages}}</li>
			<li>{{totalCount}}</li>
			<li>{{last_list}}</li>
			<li>{{next_list}}</li>-->
		</ol>
	</div>
</template>

<script>
	import $ from 'jquery';
	export default {
		data() {
			return {
				init: {
					pageNo: 1,
					pageSize: 5
				},
			};
		},
		/*
		 hasNext: true,false
		 totalCount //总共有多少条
		 totalPages //总共有多少页
		 page //分页细节对象
		 * */
		props: ['hasNext', 'totalCount', 'totalPages', 'page', 'pageSize'],
		computed: {
			pageNo() {
				if(this.page) {
					return this.page.pageNo;
				}
			},
			next() {
				if(this.page) {
					if(this.page.pageNo + 1 <= this.totalPages) {
						return this.page.pageNo + 1;
					} else {
						return null;
					}
				}
			},
			last() {
				if(this.page) {
					if(this.page.pageNo - 1 >= 0) {
						return this.page.pageNo - 1;
					} else {
						return null;
					}
				}
			},
			last_list() {
				if(this.page) {
					if(this.last > 0) {
						var l = [];
						var s = true;
						if(this.totalPages - this.pageNo > 2) {
							var tag = this.pageNo > 3 ? this.pageNo - 3 : 0;
						} else {
							switch(this.totalPages - this.pageNo) {
								case 0:
									tag = this.pageNo - 5
									break;
								case 1:
									tag = this.pageNo - 4
									break;
								case 2:
									tag = this.pageNo - 3
									break;
							}
						}
						for(var i = tag; i < this.last; i++) {
							if(i >= 0) {
								l.push(i + 1)
							}
						}
						return l;
					} else {
						return [];
					}
				}
			},
			next_list() {
				if(this.page) {
					if(this.totalPages > this.pageNo) {
						var l = [];
						for(var i = this.pageNo; i < this.totalPages; i++) {
							if(this.pageNo <= 5) {
								var tag = this.pageNo % 5
								switch(tag) {
									case 0:
										tag = 2
										break;
									case 1:
										tag = 4
										break;
									case 2:
										tag = 3
										break;
									case 3:
										tag = 2
										break;
									case 4:
										tag = 2
										break;
								}
							} else {
								var tag = (5 - (this.pageNo % 5))
								tag = tag <= 2 && this.pageNo <= 2 || tag == 5 ? 2 : 2;
							}
							if(i < this.pageNo + tag) {
								l.push(i)
							}
						}
						return l;
					} else {
						return [];
					}
				}
			},
		},
		methods: {
			go(index) {
				//				//console.log(this.hasNext, this.totalCount, this.totalPages, this.page);
				this.init.pageNo = index;
				this.$emit("pagego", this.init);
			}
		},
		mounted() {
			this.init.pageSize = this.pageSize;
			this.$emit("pagego", this.init);
		},
	};
</script>

<style lang="scss">
	.g_page {
		/*height: 20px;*/
		float: right;
		/*overflow: hidden;*/
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		ol {
			height: 20px;
			font-size: 0;
			li {
				border: 1px solid #999999;
				border-radius: 2px;
				width: 20px;
				line-height: 18px;
				color: #666666;
				font-size: 12px;
				display: inline-block;
				vertical-align: middle;
				text-align: center;
				cursor: pointer;
				&:not(:last-child) {
					margin-right: 5px;
				}
			}
			li.current {
				border-color: transparent;
				color: #0093F1;
				border-radius: 2px;
			}
			li:hover {
				color: #0093F1;
				border-color: #0093F1;
			}
		}
	}
</style>