<template>
  <div class="slt_container">
    <div class="ipt">
      <input type="text" class="cancle_focus" readonly
             v-model="sltMsg" placeholder="请选择费率"
             @click="toggleItem($event)"
             autocomplete="off">
      <span class="icon"></span>
    </div>
    <div class="itemBox" v-if="showItem==true">
      <div v-if="type=='btc'" class="item_btc">
        <div class="cur_fee">
          <p class="best_fee">当前区块最佳手续费:<span class="border_box" @click="btc_sltVla">{{bestFee}}</span>
            BTC/KB (预计到账时间一小时内)</p>
          <p class="hint"><span>提示：</span>区块数据比较拥堵，请根据您对到账时间的需求合理选择区块手续费</p>
          <div class="other">
            <p>其他参考费率</p>
            <ul v-for="i in items">
              <li>
                <span class="border_box" @click="sltValue(i)">{{i.type}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-if="type=='zec'" v-for="i in zecItems" class="item" @click="sltValue(i)">
        <span>{{i.type}}</span>
      </div>
      <div v-if="type=='eth'||type=='etc'" v-for="i in ethItems" class="item" @click="sltValue(i)">
        <span>{{i.type}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'vueSelect',
    props: ['type'],
    data() {
      return {
        showItem: false,
        items: [{
          'type': 0.003
        },
          {
            'type': 0.002
          },
          {
            'type': 0.001
          },
          {
            'type': 0.0005
          },
        ],
        zecItems: [
          {
            'type': 0.0001
          },
        ],
        ethItems: [
          {
            'type': 0.01
          },
        ],
        sltMsg: '',
        bestFee: '0',
      }
    },
    watch: {
      sltMsg (val, oldval) {

//				function validate(num){
//				  var reg = /^\d+(?=\.{0,1}\d+$|$)/
//				  if(reg.test(num)) return true;
//				  return false ;
//				}

//				val = `${val}`;
//				this.sltMsg = val.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
//				this.sltMsg = this.sltMsg.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
//				this.sltMsg = this.sltMsg.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
////				this.sltMsg = this.sltMsg.replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/, '$1$2.$3'); //只能输入两个小数
//				if(this.sltMsg.indexOf(".") < 0 && this.sltMsg != "") { //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
//					this.sltMsg = parseFloat(this.sltMsg);
//				}
//
//				this.showItem = false;
//				this.$emit("selectVal", this.sltMsg);
//				let nowval = null;
//				if(!isNaN(val)){
//					nowval = val;
//				}else{
//					nowval = oldVal;
//				}
        val = isNaN(val) ? oldval : val;
        val = val < 0 ? -val : val;
        val = val == '00' ? 0 : val;
        val = val.length == 6 && val < 0.0001 ? oldval : val;
//        		val = val.length > 6 ? oldval : val;
        this.showItem = false;
        this.sltMsg = val;
        this.$emit("selectVal", val);

      }
    },
    mounted() {


      $(window).on('click', function (evt) {
        if (evt.target.className !== 'ipt') {
          this.showItem = false;
        }
        ;
      }.bind(this));
      //零币的费率只有0.0001;
      if (this.type == 'zec') {
        this.sltMsg = 0.0001;
      } else if (this.type == 'etc' || this.type == 'eth') {
        this.sltMsg = 0.01;
      }
      this.$emit("selectVal", this.sltMsg);
    },
    methods: {
      toggleItem(evt) {
        this.showItem = !this.showItem;
        this.getBestFee();
        evt.stopPropagation();
        return false;
      },
      sltValue(data) {
        this.sltMsg = data.type;
        this.showItem = !this.showItem;
        this.$emit("selectVal", data.type)
      },
      btc_sltVla (data){
        this.sltMsg = this.bestFee;
        this.showItem = !this.showItem;
        this.$emit("selectVal", data.type)
      },
      getBestFee () {
        let options = {
          assetCode: this.type
        };
        lh_http('post', 'drawOrder/getDrawRate', options).done((res) => {
          if (res.status) {
            this.bestFee = res.data.rate;
          } else {
            //alert(res.data);
          }
        });
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .slt_container {
    position: relative;
    .ipt {
      position: relative;
      width: 320px;
      padding: 0 10px;
      height: 35px;
      line-height: 35px;
      border: 1px solid #9b9b9b;
      border-radius: 3px;
      background: #fff;
      cursor: pointer;
      input {
        width: 100%;
        height: 80%;
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
      box-shadow: 0 0px 15px #ccc;
      .item_btc, .item {
        display: block;
        width: 320px;
        padding: 0 15px;
        margin: 0;
      }
      .item {
        height: 40px;
        line-height: 40px;
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
      }
      .last_item {
        @extend .item;
        text-align: center;
        color: #0093F1;
      }
      .item_btc {
        padding: 15px;
      }
      .best_fee {
        padding-bottom: 5px;
      }
      .other {
        overflow: hidden;
        li {
          float: left;
          margin-right: 10px;
          margin-top: 13px;
        }
        p {
          font-weight: bold;
          margin-top: 5px;
        }
      }
      .hint {
        margin: 5px 0;
        span {
          color: #0093F1;
        }
      }
    }
    .border_box {
      display: inline-block;
      height: 30px;
      line-height: 30px;
      text-align: center;
      width: 60px;
      border: 1px solid #0093F1;
      border-radius: 5px;
      cursor: pointer;
      &:hover {
        background: #0093F1;
        color: #fff;
      }
    }
    .best_fee {
      .border_box {
        margin: 0 5px;
      }
    }
  }
</style>
