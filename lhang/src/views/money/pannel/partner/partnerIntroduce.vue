<template>
	<div class="partner_introduce">
		<div class="st_t1">
	      	合伙人计划介绍
	    </div>
	    <div class="st_t2">
	    	<p>推荐链行(www.lhang.com)给其他人，可以获取被推荐人45天内的充值金额返佣（CNY返佣充值面额的0.05%，数字资产返佣充值面额的0.03%），单个被邀请人50000元/5BTC/80ZEC封顶。躺着也能赚钱啦！</p>
	    </div>
	    <div class="st_t3">
	    	<p>邀请方法一：复制您的专属推荐地址推荐给您的好友</p>
	    	<p id="address"><span>您的专属地址：</span><i id="myaddress">https://lhang.com/{{ajaxData.icodestring}}.invite</i></p>
	    	<a href="javascript:void(0);" v-clipboard data-clipboard-action="copy" data-clipboard-target="#myaddress">复制</a>
	    </div>
	    <div class="st_t4">
	    	<p>邀请方法二：复制您的专属邀请码给您的好友，让好友注册时在邀请码一栏填写您的邀请码</p>
	    	<p><span>您的专属邀请码：</span><i id="mycode">{{ajaxData.icodestring}}</i></p>
	    	<a href="javascript:void(0);" v-clipboard data-clipboard-action="copy" data-clipboard-target="#mycode">复制</a>
	    </div>
	    <div class="st_t5">
	    	<p>邀请方法一：分享下方二维码给您的好友，好友通过扫码注册</p>
	    	<p><span>您的专属二维码：</span></p>
	    	<div class="code_img">
	    		<!--<img src="../../images/2d_code.png" alt="" />-->
	    		<div id="code"></div> 
	    		<a id="download" download="qrcode.jpg"></a> 
	    	</div>
	    	<a href="javascript:void(0);" @click="downloadImg">下载</a>
	    </div>
	</div>
</template>

<script>
  export default {
    name: 'partnerIntroduce',
    props: ['ajaxData'],
    data() {
      return {
        title: '',
        icodestring: '',
        totalCny: '',
        imgurl: ''
      }
    }, //定义变量
    computed: {},
    components: {
    }, //注册组件
    methods: { //方法都在这里
		downloadImg () {
			$("#download").attr('href', this.imgurl).get(0).click();
		}
    },
    mounted() {
      //获取banner
      ////console.log(222);
/*		lh_http("post","invite/myIncome",{}).done((res)=>{
			////console.log(res)
			//this.list_r = res.data.list;
			if(res.status){
				this.icodestring = res.data.data.icodestring;
			}
		});*/
/*		this.ajaxData.done((res)=>{
			if(res.status){
				this.icodestring = res.data.data.icodestring;
			}
		});*/
		//console.log(this.ajaxData);
		//https://lhang.com/003T.invite"
		//console.log($("#myaddress").html())
		$('#code').qrcode({
			 width: 150, //宽度 
			 height:150, //高度 
			 text: `https:\/\/lhang.com\/${this.ajaxData.icodestring}.invite`,
			 //text: `${this.ajaxData.icodestring}`,
		}); //任意字符串
		
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.partner_introduce{
	 text-align: left;
	 font-size: 14px;
	 margin-bottom: 32px;
    .st_t1 {
      padding: 15px 20px;
      background: #f4f4f4;
      width: 100%;
      text-align: left;
      font-size: 24px;;
      background: #f4f4f4 url(../../images/plan_introduce.png) no-repeat 20px;
      padding-left: 70px;
    }
    .st_t2{
    	padding: 10px;
    	margin-top: 11px;
    	background: #f2f9fe;
    	p{
    		font-size: 14px;
    		color: #0093f1;
    	}
    }
    .st_t3{
    	position: relative;
    	margin-top: 20px;
    	margin-left: 15px;;
    	border-bottom: 1px solid #e8e8e8;
    	p{
    		margin-bottom: 15px;
    		span{
    			color: #9b9b9b;
    		}
    		i{
    			font-style: normal;
    		}
    	}
    	a{
    		position: absolute;
    		right: 0;
    		top: 0;
    		width: 96px;
    		height: 40px;
    		line-height: 40px;
    		text-align: center;
    		color: #fff;
    		background: #0093f1;
    		border-radius: 3px;
/*			&:hover {
				background: #26a8fb;
			}
			&:active {
				background: #0084d9;
			}*/
/*    		&:hover{
    			background: darken(#0093f1, 10%)
    		}*/
    	}
    }
    .st_t4{
    	@extend .st_t3;
    }
    .st_t5{
    	@extend .st_t3;
    	border-bottom: none;
    	.code_img{
    		width: 150px;
    		height: 150px;
    		margin-left: 110px;
    		img{
    			width: 150px;
    			height: 150px;
    		}
    	}
    	
    }
}
</style>