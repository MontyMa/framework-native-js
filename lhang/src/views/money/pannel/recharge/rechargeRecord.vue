<template>
  <div class="recharge_record">
    <div class="st_t1">
      <i>&#xe651;</i>
      <span class="st_t1_name">人民币充值记录</span>
    </div>
    <table>
      <thead>
      <tr>
        <td width="22%">充值时间</td>
        <td width="10%">充值地址</td>
        <td width="10%">充值金额</td>
        <td width="10%">实到金额</td>
        <td width="10%">手续费</td>
        <td width="10%">状态</td>
        <td width="10%">操作</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(i, index) in lists">
        <td>{{i.updateTime}}</td>
        <td>{{i.account}}</td>
        <td>{{i.assetAmt}}</td>
        <td>{{i.realAmt}}</td>
        <td>0</td>
        <!--<td>{{i.assetAmt | fee('wx') | tofix(2)}}</td>-->
        <td>
          <span :class="{red: i.depositStatus=='提现失败', green: i.depositStatus == '申请中'}">{{i.depositStatus}}</span>
        </td>
        <td>
          <span class="detail" v-if="i.depositStatus=='申请中'" @click="showDetail(i)">查看详情</span>
          <span v-else>- -</span>
        </td>
      </tr>
      </tbody>
    </table>

    <modal v-if="showModal" @closeModal="closeThisModal" :amount="amountNum" :markMsg="markMessage"></modal>
    <mdal-alipay v-if="showAlipayModal" @closeModal="closeThisModal" :amount="amountNum"
                 :markMsg="markMessage"></mdal-alipay>

    <page :totalPages='list_r.totalPages' :totalCount='list_r.totalCount'
          :page='list_r.page' @pagego="getInfo" :pageSize="'5'"></page>
  </div>
</template>

<script>
  import modal from './modal';
  import mdalAlipay from './modalAlipay'
  export default {
    name: 'rechargeRecord',
    props: ['thistype', 'successModal'],
    components: {
      modal,
      mdalAlipay
    },
    data() {
      return {
        pageNo: 1,
        pageSize: 10,
        assetCode: 'btc',
        lists: [],
        list_r: {},

        showModal: false,
        showAlipayModal: false,

        amountNum: '',
        markMessage: '',
        
        mypage: null,
      }
    },
    computed: {
      uuid() {
        return this.$store.getters.uuid;
      },
      updateList() {
        return this.$store.getters.updateList;
      }
    },
    methods: {
      //获取列表信息
      getInfo(page) {
      	this.mypage = page;
        let options = {
          uuid: this.uuid,
//					pageNo: this.pageNo,
//					pageSize: this.pageSize,
          assetCode: this.thistype
        };
        lh_http('post', 'depositOrder/depositOrderJsonList', options, page).done((res) => {
          ////console.log(123, res)
          if (res.status) {
            this.lists = res.data.list.resultList;
            this.list_r = res.data.list;
          }
        })
      },
      //显示查看详情
      showDetail(data) {
        this.amountNum = data.assetAmt;
        this.markMessage = data.mark;
        this.$store.dispatch("showShadowBox", true);
        if (data.depositType == '银行卡充值') {
          this.showModal = true;
        } else if (data.depositType == '支付宝充值') {
          this.showAlipayModal = true;
        }
      },
      closeThisModal(val) {
        this.showModal = val;
        this.showAlipayModal = val;
      },

    },
    mounted() {
//			this.getInfo();
    },
    watch: {
      //添加成功之后显示充值订单的详情弹框
      successModal(val) {
        if (val) {
          this.amountNum = this.thistotalMoney;
          this.markMsg = this.thisuniqueCode;
          this.showModal = true;
          this.$store.dispatch("showShadowBox", true);
        }
      },
      //添加充值完成后刷新一下充值记录列表
      updateList(val) {
        if (val) {
          this.$store.dispatch("updateList", false);
          this.getInfo(this.mypage);
        }
      }
    },
    filters: {
      fee(val, type) {
        if (type == 'yhk') {
          return val * 0;
        } else if (type == 'zfb') {
          return val * 0;
        } else if (type == 'wy') {
          return val * 0.003;
        } else if (type == 'ky') {
          return val * 0.005;
        } else if (type == 'wx') {
          return val * 0.006;
        }
      },
      tofix(val, type) {
        return val.toFixed(type);
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .recharge_record {
    .st_t1 {
      height: 30px;
      line-height: 30px;
      text-align: left;
      font-size: 14px;
      font-weight: bold;
      /*background: #f8f8f8 url(../../images/record.png) no-repeat 10px;*/
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
          }
          /*				&:nth-child(2n){
                    background: #f2f9fe;
                }*/
          &:hover {
            background-color: #F2F9FE;
          }
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
    .detail {
      color: #0093F1;
      cursor: pointer;
    }
  }
</style>
