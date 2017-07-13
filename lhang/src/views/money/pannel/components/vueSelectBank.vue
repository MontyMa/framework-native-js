<template>
  <div class="slt_container">
    <div class="ipt">
      <input class="cancle_focus" type="text" :value="sltMsg" :placeholder="defaultname" readonly
             @click="toggleItem($event)">
      <span class="icon"></span>
    </div>
    <!--添加银行卡-->
    <div class="itemBox" v-show="showItem" v-if="type == 'bank'">
      <div v-for="i in lists" class="item" @click="sltValue(i)">
        <span class="bank_name">{{i.bankName}}</span>
        <span class="bank_num">{{i.bankAccount | getNum}}</span>
        <span class="authentication" v-if="!i.isAuth">未认证</span>
        <span class="authentication" v-if="i.isAuth">已认证</span>
      </div>
      <div class="last_item" @click="isShowBankModal"><span class="add_icon">&#xe657;</span>添加新账户</div>
    </div>
    <!--添加支付宝-->
    <div class="itemBox" v-show="showItem" v-if="type == 'alipay'">
      <div v-for="i in lists" class="item" @click="sltValue(i)">
        <span class="bank_name">{{i.alipayAccount}}</span>
        <span class="bank_num">{{i.userAlipayName}}</span>
        <span class="authentication" v-if="!i.isAuth">未认证</span>
        <span class="authentication" v-if="i.isAuth">已认证</span>
      </div>
      <div class="last_item" @click="isShowAlipayModal"><span class="add_icon">&#xe657;</span>添加新账户</div>
    </div>
    <!--添加新地址-->
    <div class="itemBox" v-show="showItem" v-if="type.indexOf('Address') != -1">
      <ul v-for="i in lists" class="item remark" @click="sltValue(i)" v-if="i.assetCode == digistType">
        <li class="address address_txt">{{i.digitAssetAddress}}</li>
        <template v-if="i.remark !==''">
          <li class="address address_remark"><span class="lay">{{i.remark}}</span></li>
        </template>
      </ul>
      <div class="last_item" @click="isAddressModal"><span class="add_icon">&#xe657;</span>添加新地址</div>
    </div>
    <modal-addbank v-if="showBankModal"
                   @closeModal="closeThisModal"
                   @updateList="getUpdataMsg"
                   @selectNew="getNewAddress">
    </modal-addbank>

    <modal-add-alipay v-if="showAlipayModal"
                      @closeModal="closeThisModal"
                      @updateList="getUpdataMsg"
                      @selectNew="getNewAddress">
    </modal-add-alipay>

    <modal-add-address v-if="showAddressModal"
                       @closeModal="closeThisModal"
                       @updateList="getUpdataMsg"
                       @selectNew="getNewAddress"
                       :type="digistType">
    </modal-add-address>

  </div>
</template>
<script>
  import modalAddbank from './modalAddbank'
  import modalAddAlipay from './modalAddAlipay'
  import modalAddAddress from './modalAddAddress'
  export default {
    name: 'vueSelectBank',
    data () {
      return {
        showItem: false,
        showBankModal: false,
        showAlipayModal: false,
        showAddressModal: false,
        lists: [],
        sltMsg: '',
      }
    },
    components: {
      modalAddbank,
      modalAddAlipay,
      modalAddAddress
    },
    props: ['value', 'type'],
    computed: {
      defaultname () {
        if (this.type == "bank") {
          return "选择银行卡";
        } else if (this.type == "alipay") {
          return "选择支付宝账号";
        } else if (this.type.indexOf("Address") != -1) {
          return "选择提币地址";
        }
      },
      digistType () {
        if (this.type.indexOf("Address") != -1) {
          return this.type.slice(0, 3);
        }
      }

    },
    methods: {
      toggleItem (evt) {
        this.showItem = !this.showItem;
        evt.stopPropagation();
      },
      sltValue (data) {
        if (this.type == 'bank') {
          this.sltMsg = data.bankName + '   尾号为' + data.bankAccount.toString().slice(-4);
          this.showItem = !this.showItem;
          this.$emit('thisbankName', data.bankName);
          this.$emit('thisbankAccount', data.bankAccount);
        } else if (this.type == "alipay") {
          this.sltMsg = data.alipayAccount + '    ' + data.userAlipayName;
          this.showItem = !this.showItem;
          this.$emit('thisbankAccount', data.alipayAccount);
        } else if (this.type.indexOf("Address") != -1) {
          this.sltMsg = data.digitAssetAddress;
          this.showItem = !this.showItem;
          this.$emit('thisbankAccount', data.digitAssetAddress);
        }
      },
      //显示添加银行弹框
      isShowBankModal () {
        this.showBankModal = true;
        this.$store.dispatch("showShadowBox", true);
      },
      //关闭弹框
      closeThisModal (val) {
        this.showBankModal = val;
        this.showAlipayModal = val;
        this.showAddressModal = val;
        this.$store.dispatch("showShadowBox", false);
      },
      //显示添加支付宝地址弹框
      isShowAlipayModal () {
        this.showAlipayModal = true;
        this.$store.dispatch("showShadowBox", true);
      },
      //显示添加数字货币地址弹框
      isAddressModal () {
        this.showAddressModal = true;
        this.$store.dispatch("showShadowBox", true);
      },
      //获取银行列表
      getList () {
        let url = "";

        if (this.type == "bank") {
          url = 'bankInfo/bankInfoPageJsonList';
        } else if (this.type == "alipay") {
          url = 'alipayInfo/alipayInfoPageJsonList';
        } else if (this.type.indexOf('Address') != -1) {
          url = 'walletInfo/walletInfoPageJsonList';
        }

        lh_http("post", url, {}).done((res) => {
          if (res.status && res.data.list) {
            let resultList = res.data.list.resultList;
            resultList.forEach(elem => {
              if (elem.remark.length >= 6) {
                elem.remark = `${elem.remark.slice(0, 6)}...`
              }
            });

            this.$nextTick(() => this.lists = resultList);
          }
        });
      },
      //添加完成后刷新列表
      getUpdataMsg (val) {
        if (val) {
          this.getList();
        }
      },
      //设置最新添加的银行为默认银行
      getNewAddress (val) {
        if (val) {
          if (this.type == "bank") {
            this.sltMsg = val.bankName + '   尾号为' + val.bankAccount.toString().slice(-4);
            this.$emit('thisbankName', val.bankName);
            this.$emit('thisbankAccount', val.bankAccount);
          } else if (this.type == "alipay") {
            this.sltMsg = val.alipayAccount + '    ' + val.userAlipayName;
            //console.log('moren',val.alipayAccount)
            this.$emit('thisbankAccount', val.alipayAccount);
          } else if (this.type.indexOf('Address') != -1) {
            this.sltMsg = val.digitAssetAddress;
            this.$emit('thisbankAccount', val.digitAssetAddress);
          }
        }
      }
    },
    mounted () {
      $(window).on('click', function (evt) {
        if (evt.target.className !== 'ipt') {
          this.showItem = false;
        }
      }.bind(this));

      this.getList();
    },
    filters: {
      getNum(val) {
        return '尾号为' + val.toString().slice(-4);
      }
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .slt_container {
    position: relative;
    .ipt {
      width: 320px;
      padding: 0 10px;
      height: 35px;
      line-height: 35px;
      border: 1px solid #9b9b9b;
      border-radius: 3px;
      background: #fff;
      color: #bbb;
      cursor: pointer;
      input {
        width: 100%;
        height: 80%;
        border: none;
        outline: none;
        cursor: pointer;
      }
      .icon {
        position: absolute;
        right: 7px;
        top: 10px;
        width: 7px;
        height: 12px;
        background: url(../../images/Group_2.png) left;
      }
      .cancle_focus:focus {
        border: none !important;
        outline: none;
        box-shadow: none;
      }
    }
    .itemBox {
      position: absolute;
      left: 0;
      top: 35px;
      background: #fff;
      z-index: 10;
      box-shadow: 0 0 15px #ccc;
      max-height: 300px;
      overflow: auto;
      .address_txt {
        text-align: left !important;
        max-width: 185px;
        word-wrap: break-word;
        word-break: normal;
      }
      .address_remark {
        text-align: right !important;
        .lay {
          width: 89px;
          display: inline-block;
        }
        &:before {
          content: '|';
          margin-right: 7px;
          font-size: 12px;
          display: inline-block;
          color: #b9b9b9;
        }
      }
      .address {
        display: inline-block;
        vertical-align: middle;
      }
      .item {
        position: relative;
        cursor: pointer;
        width: 320px;
        padding: 5px 15px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin: 0;
        &.remark {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        &:hover {
          background: #0093F1;
          color: #fff;
        }
        .bank_name {
          padding-right: 10px;
          border-right: 1px dashed #ccc;
        }
        .bank_num {
          padding-left: 10px;
        }
        .authentication {
          position: absolute;
          right: 10px;
          top: 0px;
        }
        .address {
          display: inline-block;
          text-align: center;
        }
      }
      .last_item {
        @extend .item;
        text-align: center;
        color: #0093F1;
        /*background: url(./img/add.png) no-repeat 110px;*/
        .add_icon {
          margin-right: 5px;
        }
      }
    }
  }
</style>
