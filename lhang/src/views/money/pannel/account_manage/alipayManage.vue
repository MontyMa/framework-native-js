<template>
	<div class="alipay_manage">
		<div v-if="activated && isAuth">
			<table>
				<thead>
					<tr>
						<td width="20%">账户人名</td>
						<td width="20%">账户账号</td>
						<td width="20%">添加时间</td>
						<td width="20%">认证状态</td>
						<td width="20%">操作</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, index) in lists" v-if="index<10">
						<td>{{item.userAlipayName | encrypt('username')}}</td>
						<td>{{item.alipayAccount}}</td>
						<td>{{item.createTime}}</td>
						<td>
							<span class="green" v-if="item.isAuth == false">未认证</span>
							<span v-else>已认证</span>
						</td>
						<td>
							<a href="javascript:;" class="blue" v-if="item.isDefault == false" @click="setDefault(item.id)">设为默认</a>
							<a href="javascript:;" class="green" v-if="item.isDefault == true">默认</a>
							<!--<a href="javascript:;" class="red" @click="deleteAccount(item.id)">删除</a>-->
							<a href="javascript:;" class="red" @click="showDelete(item.id)">删除</a>
						</td>
					</tr>
				</tbody>
			</table>
			<a href="javascript:;" class="add_new" @click="showThisModal">添加新账户</a>
		</div>
		<div v-else>
			<pre-register></pre-register>
		</div>
		<alipay-modal v-if="showModal==true" :value="showModal" @closeModal="closeThisModal"></alipay-modal>
		<delete-ensure v-if="showDeleteModal" @closeModal="closeThisModal" :thisDelete="deleteType"></delete-ensure>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import alipayModal from "./alipayModal"
	import store from '../../../../vuex/store'
	import preRegister from '../../../../components/checkAuth/preRegister'
	import deleteEnsure from './deleteEnsure'
	export default {
		name: 'alipayManage',
		data() {
			return {
				lists: [], //账户列表信息
				pages: {}, //分页信息
				isRegister: {
					activated: false, //是否激活账号
					authType: '' //授权信息('c1或c2')
				}, //是否完成注册
				showModal: false, //打开弹框
		        showDeleteModal: false, //显示确认删除按钮
		        deleteType: {
		        	type: 'alipay',
		        	id: ''
		        },
		        activated: true,
		        isAuth: false,
			}
		},
		components: {
			alipayModal,
			preRegister,
			deleteEnsure
		},
		computed: {
			user() {
				return this.$store.getters.getUser;
			},
		},
		methods: {
			//添加账号弹框
			showThisModal() {
				this.showModal = true;
				store.dispatch("showShadowBox", true);
			},
			//设为默认
			setDefault(val) {
				lh_http("post", "alipayInfo/default", {
					id: val
				}).done((res) => {
					if(res.status == true) {
						this.getMsg(1);
					}
				})
			},
			//刷新信息
			getMsg(n) {
				lh_http("post", "alipayInfo/alipayInfoPageJsonList", {
					pageNo: n,
					pageSize: 10
				}).done((res) => {
					if(res.status == true) {
						this.lists = res.data.list.resultList;
						this.pages = res.data.list.page;
					}
				})
			},
			/*			deleteAccount(val) {
							lh_http("post", "alipayInfo/delete", {
								id: val
							}).done((res) => {
								//console.log(res)
								this.getMsg(1)
							})
						},*/
			//打开确认删除弹框
			showDelete(val) {
				//console.log(11111)
				this.deleteType.id = val;
				this.showDeleteModal = true;
				this.$store.dispatch("showShadowBox", true);
			},
			//关闭弹窗
			closeThisModal(val) {
				this.showModal = val;
        		this.showDeleteModal = val;
				this.getMsg(1);
			}
		},
		mounted() {
			if(this.user){
				this.activated = this.user.customerInfo.activated;
				this.isAuth = this.user.customerInfo.authType ? true : false;
			}
			this.getMsg(1);
			/*if(cookie().get('user').customerInfo){
				this.isRegister = cookie().get('user').customerInfo
			}*/
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	$gray: #9b9b9b;
	.alipay_manage {
		table {
			width: 100%;
			border-collapse: collapse;
			thead td {
				text-align: center;
				padding: 20px 0 10px 0;
				color: #9b9b9b;
				border-bottom: 1px dashed #d7d7d7;
/*				&:nth-child(2n-1) {
					border-bottom: 2px solid #0093F1;
				}*/
			}
			tbody {
				tr {
					td {
						text-align: center;
						height: 60px;
						line-height: 60px;
						a {
							display: inline-block;
							&:first-child {
								width: 70px;
							}
						}
					}/*
					&:nth-child(2n) {
						background: #f2f9fe;
					}*/
					&:hover {
						background-color: #F2F9FE;
					}
				}
			}
		}
		p {
			color: #0093f1;
			margin-top: 20px;
			margin-left: 10px;
		}
		.add_new {
			display: block;
			width: 120px;
			height: 40px;
			text-align: center;
			line-height: 40px;
			background: #0093F1;
			border-radius: 3px;
			color: #fff;
			margin: 30px 0 0 0px;
			&:hover {
				background: #26a8fb;
			}
			&:active {
				background: #0084d9;
			}
		}
		.green {
			color: #50e3c2;
		}
		.blue {
			color: #0093f1;
		}
		.red {
			color: #f15984;
		}
	}
</style>