<template>
  <div class="etc_address">
    <div v-if="clickable">
      <table>
        <thead>
        <tr>
          <td width="20%">账户类型</td>
          <td width="20%">钱包类型</td>
          <td width="20%">钱包地址</td>
          <td width="20%">备注信息</td>
          <td width="20%">操作</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in lists" v-if="index<10">
          <td>{{item.assetCode}}</td>
          <td>{{item.walletType}}</td>
          <td>{{item.digitAssetAddress}}</td>
          <td>{{item.remark}}</td>
          <td>
            <!--<a href="javascript" class="blue">设为默认</a>-->
            <!--<a href="javascript:;" class="red" @click="deleteAccount(item.id)">删除</a>-->
            <a href="javascript:;" class="red" @click="showDelete(item.id)">删除</a>
          </td>
        </tr>
        </tbody>
      </table>
      <a href="javascript:;" class="add_new" @click="openModal">添加新地址</a>
    </div>
    <div v-else>
      <pre-register2 :type="setType" :myType="subTitle"></pre-register2>
    </div>
    <modal v-if="showModal" :type="setType" @closeModal="closeThisModal" @updateList="getUpdataMsg"></modal>
    <delete-ensure v-if="showDeleteModal" @closeModal="closeThisModal" :thisDelete="deleteType"></delete-ensure>
  </div>
</template>

<script>
  import modal from './modal'
  import store from '../../../../vuex/store'
  import preRegister2 from '../../../../components/checkAuth/preRegister2'
  /*import preRegister2 from './preRegister2'*/
  import {mapGetters} from 'vuex'
  import deleteEnsure from './deleteEnsure'
  export default {
    name: 'etcAddress',
    data() {
      return {
        lists: [], //卡信息列表
        pages: {}, //分页信息
        isRegister: {
          activated: false, //是否激活账号
          authType: '', //授权信息(c1,c2等)
        }, //是否完成注册
        showModal: false, //显示弹窗
        setType: {
          name: "以太经典", //虚拟货币名称
          moneytype: 'etc',
          type: 'addAddress'
        },
        myuuid: "",
        subTitle: '以太经典提现', //注册页面的功能的title
        showDeleteModal: false, //显示确认删除按钮
        deleteType: {
          type: 'digital',
          id: ''
        },

        actived: true,
        thisvalidationMobile: false,
        thisvalidationGoogle: false,
        thispayPassword: false,
        status: false,
        clickable: false,
      }
    },
    components: {
      modal,
      preRegister2,
      deleteEnsure
    },
    computed: {
      thisUuid() {
        return this.$store.getters.uuid;
      },
      showBTCModal() {
        return this.$store.getters.showMoneyBTCModal;
      },
      user() {
        return this.$store.getters.getUser;
      },
    },
    watch: {
      showBTCModal(val) {
        this.showModal = val;
        this.getMsg();
      }
    },
    methods: {
      //打开弹框
      openModal() {
        this.showModal = true;
        store.dispatch("showShadowBox", true);
      },
      //设为默认
      /*    	setDefault (val) {
       lh_http("post", "bankInfo/default", {
       id: val
       }).done((res) => {
       //console.log(res)
       if(res.status == true){
       this.getMsg(1)
       }
       })
       },*/
      //加载列表信息
      getMsg() {
        /*lh_http("post","walletInfo/walletInfoPageJsonList", {
         "useruuid": this.thisUuid,
         }).done((res) => {
         if(res.status == true) {
         this.lists = res.data.list.resultList;
         this.pages = res.data.list.page;
         }
         })*/
        lh_http("post", "walletInfo/walletInfoJsonList", {
          "useruuid": this.thisUuid,
          "assetCode": 'etc'
        }).done((res) => {
          if (res.status) {
            let list = res.data.list;
            list.forEach(elem => {
              let remark = elem.remark;
              if (remark.length >= 10) {
                elem.remark = `${remark.slice(0, 10)}...`;
              }
            });
            this.$nextTick(() => this.lists = list);
            //this.pages = res.data.list.page;
          }
        })
      },
      //删除
      deleteAccount(val) {
        lh_http("post", "walletInfo/delete", {
          "useruuid": this.thisUuid, //用户UUID
          "id": val //数字资产账户ID
        }).done((res) => {
          this.getMsg()
        })
      },
      //打开确认删除弹框
      showDelete(val) {
        this.deleteType.id = val;
        this.showDeleteModal = true;
        this.$store.dispatch("showShadowBox", true);
      },
      //关闭弹窗
      closeThisModal(val) {
        this.showModal = val;
        this.showDeleteModal = val;
        this.getMsg();
      },
      //添加完成后刷新列表
      getUpdataMsg(val) {
        if (val) {
          this.getMsg();
        }
      },
    },
    mounted() {
      if (this.user) {
        //是否注册
        this.activated = this.user.customerInfo.activated;
        //绑定手机或设置谷歌验证码
        this.thisvalidationMobile = this.user.customerInfo.mobile ? true : false;
        this.thisvalidationGoogle = this.user.customerInfo.otherGoogleIdentifier ? true : false;
        //资金密码
        this.thispayPassword = this.user.customerInfo.hasPayPassword;
        //提现验证
        let lists = this.user.policyList;
        for (let i = 0; i < lists.length; i++) {
          if (lists[i].validationMode == 'draw') {
            if (lists[i].showText) {
              this.status = true;
            }
          }
        }

        if (this.activated && (this.thisvalidationMobile || this.thisvalidationGoogle) && this.thispayPassword && this.status) {
          this.clickable = true;
        }
      }
      this.getMsg();
      ////console.log(this.lists.length)
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .etc_address {
    table {
      width: 100%;
      border-collapse: collapse;
      thead td {
        text-align: center;
        padding: 20px 0 10px 0;
        color: #9b9b9b;
        border-bottom: 1px dashed #D7D7D7;
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
