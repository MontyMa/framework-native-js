<template>
  <div class="cny_withdraw_record">
    <div class="st_t1">
      <i>&#xe651;</i>
      <span class="st_t1_name">人民币提现记录</span>
    </div>
    <table>
      <thead>
      <tr>
        <td width="20%">提现时间</td>
        <td width="20%">银行卡号</td>
        <td width="15%">提现金额</td>
        <td width="15%">实到金额</td>
        <td width="10%">提现手续费</td>
        <td width="10%">状态</td>
        <td width="10%">操作</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(i, index) in lists">
        <td>{{i.createTime}}</td>
        <td>{{i.walletAddress}}</td>
        <td>{{i.amount}}</td>
        <td>{{i.amount - i.walletFee}}</td>
        <td>{{i.walletFee}}</td>
        <td>
          <a href="javascript:void(0);" :class="{red: i.status == '提现失败', green: i.status == '申请中'}">{{i.status}}</a>
        </td>
        <td>
          <a href="javascript:void(0);" class="blue" v-if="i.status == '申请中'" @click="showCancelModal(i.id)">撤销</a>
          <a href="javascript:void(0);" v-else>--</a>
        </td>
      </tr>
      </tbody>
    </table>

    <modal-cancel :id="cancelId" :ajax="getList" :myPage="thisPage" @closeModal="closeModal"
                  v-if="showModal"></modal-cancel>

    <page :totalPages='list_r.totalPages' :totalCount='list_r.totalCount'
          :page='list_r.page' @pagego="getList" :pageSize="'5'"></page>
  </div>
</template>

<script>
  import modalCancel from './modal_cancle'
  export default {
    data() {
      return {
        assetCode: "cny", //资产编码
        pageNo: 1,
        pageSize: 10,
        lists: [],
        list_r: {},
        showModal: false,
        cancelId: '',
        thisPage: {},
        mypage: null,
      }
    },
    computed: {
      updataList() {
        return this.$store.getters.updateCnyList;
      }
    },
    components: {
      modalCancel
    },
    methods: {
      getList(page) {
        this.mypage = page;
        this.thisPage = page;
        let options = {
          "assetCode": this.assetCode, //资产编码
//					"pageNo": this.pageNo,
//					"pageSize": this.pageSize
        };
        lh_http('post', 'drawOrder/drawOrderJsonList', options, page).done((res) => {
          if (res.status) {
            this.lists = res.data.list.resultList;
            this.list_r = res.data.list;
          } else {

          }
        })
      },
      showCancelModal (id) {
        this.cancelId = id;
        this.$store.dispatch("showShadowBox", true);
        this.showModal = true;
      },
      closeModal (val) {
        this.showModal = false;
      }
    },
    mounted() {
//			this.getList()
    },
    watch: {
      updataList(val) {
        if (val) {
          this.getList(this.mypage);
          this.$store.dispatch('updateCnyList', false);
        }
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .cny_withdraw_record {
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
      margin: 30px 0 0 23px;
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
