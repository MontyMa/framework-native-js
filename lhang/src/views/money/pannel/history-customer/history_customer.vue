<template>
  <div class="history_customer">

    <div class="title">
      <div class="text lay">
      	<span>账户历史明细</span>
      </div>
      <div class="time_box">
				<datepicker @dateVal="getStartTime" :value="req.startTime" :disabled-days-of-week="disabled" :format="format" :clear-button="clear" :placeholder="placeholder1" ></datepicker>
				<i>-</i>
				<datepicker @dateVal="getEndTime" :value="req.endTime" :disabled-days-of-week="disabled" :format="format" :clear-button="clear" :placeholder="placeholder2" ></datepicker>
				<a href="javascript:;" @click="getList(curIndex)">查询</a>
      </div>
    </div>

    <div class="history_cont">
      <ul class="his_tab">
        <li :class="{active: showItem == 1}" @click="showWhichItem(1)">全部</li>
        <li :class="{active: showItem == 2}" @click="showWhichItem(2)">充值</li>
        <li :class="{active: showItem == 3}" @click="showWhichItem(3)">提现</li>
        <li :class="{active: showItem == 4}" @click="showWhichItem(4)">活动</li>
      </ul>

<!--      <div class="his_list" v-if="showItem == 2">
        <ul class="his_table_head">
          <li>时间</li>
          <li>操作类型</li>
          <li>资产类型</li>
          <li>操作金额</li>
          <li>本次结算金额</li>
          <li>上次估算金额</li>
        </ul>
        <div class="his_data_wrap">
          <ul v-for="i in allList">
            <li>{{i.createTime}}</li>
            <li>{{i.operateType}}</li>
            <li>{{i.assetCode}}</li>
            <li></li>
            <li>{{i.netAssetAmt}}</li>
            <li>{{i.lastAssetAmt}}</li>
          </ul>
        </div>
      </div>

      <div class="his_list" v-if="showItem == 3">
        <ul class="his_table_head">
          <li>时间</li>
          <li>操作类型</li>
          <li>资产类型</li>
          <li>操作金额</li>
          <li>本次结算金额</li>
          <li>上次估算金额</li>
        </ul>
        <div class="his_data_wrap">
          <ul v-for="i in allList">
            <li>{{i.createTime}}</li>
            <li>{{i.operateType}}</li>
            <li>{{i.assetCode}}</li>
            <li></li>
            <li>{{i.netAssetAmt}}</li>
            <li>{{i.lastAssetAmt}}</li>
          </ul>
        </div>
      </div>

      <div class="his_list" v-if="showItem == 4">
        <ul class="his_table_head">
          <li>时间</li>
          <li>操作类型</li>
          <li>资产类型</li>
          <li>操作金额</li>
          <li>本次结算金额</li>
          <li>上次估算金额</li>
        </ul>
        <div class="his_data_wrap">
          <ul v-for="i in allList">
            <li>{{i.createTime}}</li>
            <li>{{i.operateType}}</li>
            <li>{{i.assetCode}}</li>
            <li></li>
            <li>{{i.netAssetAmt}}</li>
            <li>{{i.lastAssetAmt}}</li>
          </ul>
        </div>
      </div>-->

      <div class="his_list">
        <ul class="his_table_head">
          <li>时间</li>
          <li>操作类型</li>
          <li>资产类型</li>
          <li>操作金额</li>
          <li>本次结算金额</li>
          <li>上次结算金额</li>
        </ul>
        <div class="his_data_wrap">
          <ul v-for="i in allList">
            <li>{{i.createTime}}</li>
            <li>{{i.operateType}}</li>
            <li>{{i.assetCode | changeCaps('uppercase')}}</li>
            <li>{{i.operatorAmt}}</li>
            <li>{{i.netAssetAmt}}</li>
            <li>{{i.lastAssetAmt}}</li>
          </ul>
        </div>
      </div>
      <page  :totalPages='list_r.totalPages' :totalCount='list_r.totalCount'
      :page='list_r.page' @pagego="getList" :pageSize="'5'"></page>
    </div>
  </div>
</template>
<script>
export default{
	data () {
		return {
			showItem: 1,
			allList: [],//全部历史明细
			chargeList: [],
			withDrawList: [],
			specialList: [],
		  curIndex: 1,
			//日期对象
			disabled: [],
		  format: 'yyyy-MM-dd',
		  clear: true,
		  placeholder1: '开始时间',
		  placeholder2: '结束时间',
		  //查询参数
	    req: {
				startTime: '',
				endTime: ''
			},
			list_r:{},
			list_page: null
			//
		}
	},
	methods: {
		//获取日期
		getStartTime (val) {
			////console.log(val);
			this.req.startTime = val;
		},
		getEndTime (val) {
			////console.log(val);
			this.req.endTime = val;
		},
		showWhichItem (val) {
			this.showItem = val;
			this.curIndex = val;
			this.getList();
			this.list_page = null;
		},
		getpage (val) {
			this.mypage = val;
		},
		//获取全部历史明细
		getList (page) {
			if(this.list_page){
				page = {
					pageNo: 1,
					pageSize: 5
				}
			}
			this.list_page = page;
			var val = this.curIndex;
			let options = this.req;
			//options.useruuid = "7d7ec237-cba0-4da6-b0fd-5c46071f5632";
			let url = '';
			if(val == 1){
				url = 'userAssetRecord/allHistoryList';
			}else if(val == 2){
				url = 'userAssetRecord/depositHistoryList';
			}else if(val == 3){
				url = 'userAssetRecord/drawHistoryList';
			}else if(val == 4){
				url= 'userAssetRecord/activityHistoryList';
			}
			lh_http("post", url, options, page).done((res)=>{
				if(res.status){
					this.allList = res.data.list.resultList;
					this.list_r = res.data.list;
				}
			});
		},
	},
	mounted () {
//		this.getList(1);
	}
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  /*账户历史明细*/
  .history_customer {
    margin-top: 60px;
    min-height: 230px;
    .title {
    	height: 30px;
    	line-height: 30px;
      box-sizing: border-box;
      background-color: #f4f4f4;
      position: relative;
      .text {
        font-size: 14px;
        margin-left: 10px;
        color: #0093F1;
        font-weight: bold;
      }
      /*日期筛选框预留区域*/
      .date_area {
        /*height: 40px;
        background-color: #999;*/
      }
     	.time_box{
				input{
					width: 170px;
					height: 32px;
					border: 1px solid #ccc;
				}
				position: absolute;
				right: 0;
				top: -1px;
				a{
					font-size: 14px;
					color: #0093F1;
					margin: 0 10px;
				}
			}
    }
  }

  .history_cont {
    margin-top: 16px;
    .his_tab {
      font-size: 0;
      border-bottom: 2px solid #d7d7d7;
      li {
        cursor: pointer;
        width: 16%;
        text-align: center;
        line-height: 43px;
        display: inline-block;
        vertical-align: middle;
        font-size: 14px;
        color: #1B1E23;
        border-bottom: 2px solid transparent;
        margin-bottom: -2px;
        &.active {
          border-color: #0093f1;
          background-color: #ffffff;
          color: #0093F1;
          font-weight: bold;
        }
      }
    }
    .his_table_head {
      font-size: 0;
      border-bottom: 1px dashed #d7d7d7;
      li {
        display: inline-block;
        vertical-align: middle;
        font-size: 14px;
        text-align: center;
        color: #9B9B9B;
        width: (100%-20%-5*2%)/5;
        line-height: 40px;
        margin-top: 15px;
        &:first-child {
          width: 20%;
        }
        &:not(:first-child) {
          margin-left: 2%;
        }
      }
    }
    .his_data_wrap {
      font-size: 0;
      ul:hover {
        background-color: #F2F9FE;
      }
      li {
        text-align: center;
        display: inline-block;
        vertical-align: middle;
        font-size: 13px;
        color: #1B1E23;
        line-height: 50px;
        width: (100%-20%-5*2%)/5;
        &:first-child {
          width: 20%;
        }
        &:not(:first-child) {
          margin-left: 2%;
        }
      }
    }
  }
</style>

