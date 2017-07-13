<template>
  <div class="btc_withdraw_record">
    <div class="st_t1">
      <i>&#xe651;</i>
      <span class="st_t1_name">{{type.name}}提现记录</span>
    </div>
    <table>
      <thead>
      <tr>
        <td width="20%">提现时间</td>
        <td width="25%">接收地址</td>
        <td width="15%">提现数量</td>
        <td width="15%">提现手续费</td>
        <td width="15%">状态</td>
        <td width="10%" v-if="type.moneytype=='btc'">加速服务</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(i, index) in lists">
        <td>{{i.createTime}}</td>
        <td>{{i.walletAddress}}</td>
        <td>{{i.amount}}</td>
        <td>{{i.walletFee}}</td>
        <!--<td>{{i.walletFee}}</td>-->
        <td>
          <a href="javascript:void(0);" :class="{red: i.status == '提现失败', green: i.status == '申请中'}">{{i.status}}</a>
        </td>
        <td v-if="type.moneytype=='btc'">
        	<a href="https://pushtx.btc.com/#/" class="speed" target="_blank">去加速</a>
        </td>
      </tr>
      </tbody>
    </table>

    <page :totalPages='list_r.totalPages' :totalCount='list_r.totalCount'
          :page='list_r.page' @pagego="getList" :pageSize="'5'"></page>
  </div>
</template>

<script>
  export default {
    props: ['type'],
    data() {
      return {
        //assertCode: "btc",//资产编码
        pageNo: 1,
        pageSize: 10,
        lists: [],
        list_r: {},
        mypage: null,
      }
    },
    computed: {
      updataList() {
        return this.$store.getters.updateDigistList;
      }
    },
    methods: {
      getList(page) {
      	this.mypage = page;
        let options = {
          "assetCode": this.type.moneytype, //资产编码
//					"pageNo": this.pageNo,
//					"pageSize": this.pageSize
        };
        lh_http('post', 'drawOrder/drawOrderJsonList', options, page).done((res) => {
          this.lists = res.data.list.resultList;
          this.list_r = res.data.list;
        })
      },
    },
    mounted() {
//			this.getList();
    },
    watch: {
      updataList(val) {
        if (val) {
          this.getList(this.mypage);
          this.$store.dispatch('updateDigistList', false);
        }
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .btc_withdraw_record {
    .st_t1 {
      height: 30px;
      line-height: 30px;
      text-align: left;
      font-size: 14px;
      font-weight: bold;
      padding-left: 6px;
      color: #0093F1;
      background: #F8F8F8;
      i {
        font-style: normal;
        font-size: 16px;
      }
      .st_t1_name {
        text-align: top;
      }
    }
    table {
      width: 100%;
      border-collapse: collapse;
      thead td {
        text-align: center;
        padding: 20px 0 10px 0;
        color: #9b9b9b;
        border-bottom: 1px solid #d7d7d7;
        /*			&:nth-child(2n-1){
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
				    .speed{
				    	display: inline-block;
				    	background: #0093F1;
				    	width: 56px;
				    	height: 28px;
				    	line-height: 28px;
				    	border-radius: 3px;
				    	text-align: center;
				    	color: #fff;
							&:hover{
								background: #26a8fb;
							}
							&:active{
								background: #0084d9;
							}
				    }
          }
          &:hover {
            background-color: #F2F9FE;
          }
          /*				&:nth-child(2n){
                    background: #f2f9fe;
                }*/
        }
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
