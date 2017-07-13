<template>
  <div class="user" id="user">
    <!--
            作者：846966684@qq.com
            时间：2017-02-21
            描述：通用全局容器--全屏容器
        -->
    <ion-content class="content">
      <user-title></user-title>
      <ion-content12>
        <div class="trading_title">
          <div class="container">
            <!--面包屑-->
            <breadcrumb-trail></breadcrumb-trail>
          </div>
        </div>
        <div class="box">
          <div class="content_left">
            <div class="main">
              <div class="ul_content">
                <ul>
                  <li class="ul_title">
                    <i class="my_icon">&#xe650;</i>
                    	<span class="item_name">安全中心</span>
                  </li>
                  <li :class="{ active: isPath == '/user/settings/' }">
                    <a :class="{ active: isPath == '/user/settings/' }" href="#/user/settings">安全设置</a>
                  </li>
                  <li :class="{ active: isPath == '/user/policy' }">
                    <a :class="{ active: isPath == '/user/policy' }" href="#/user/policy">安全策略</a>
                  </li>
                  <li :class="{ active: isPath == '/user/securitylog' }">
                    <a :class="{ active: isPath == '/user/securitylog' }" href="#/user/securitylog">安全记录</a>
                  </li>
                </ul>

                <ul>
                  <li class="ul_title">
                    <i class="my_icon">&#xe64f;</i>
                    <span class="item_name">用户中心</span>
                  </li>
                  <li :class="{ active: isPath == '/user/info' }">
                    <a :class="{ active: isPath == '/user/info' }" href="#/user/info">基本信息</a>
                  </li>
                  <li :class="{ active: isPath == '/user/auth' }">
                    <a :class="{ active: isPath == '/user/auth' }" href="#/user/auth">实名认证</a>
                  </li>
                  <li :class="{ active: isPath == '/user/notice' }">
                    <a :class="{ active: isPath == '/user/notice' }" href="#/user/notice">我的消息</a>
                  </li>
                  <!--隐藏我的积分-->
<!--                  <li :class="{ active: isPath == '/user/points' }">
                    <a :class="{ active: isPath == '/user/points' }" href="#/user/points">我的积分</a>
                  </li>-->
                  <li :class="{ active: isPath == '/user/api/' }">
                    <a :class="{ active: isPath == '/user/api/' }" href="#/user/api/index">我的API</a>
                  </li>
                </ul>
              </div>

              <div class="ul_content">
                <ul>
                  <li class="ul_title">
                    <i class="my_icon">&#xe64a;</i>
                    <span class="item_name">客服支持</span>
                  </li>
                  <li>
                    <a href="http://q.url.cn/s/Wnafsym" target="_blank">在线客服</a>
                  </li>
                  <li>
                    <a href="http://shang.qq.com/wpa/qunwpa?idkey=e7f238e982c2c667d1eab036927be6242314bbf94612d6bf5ab27cd9b3fe1e6d" target="_blank">QQ交流群</a>
                  </li>
                </ul>
              </div>

            </div>
          </div>
          <div class="content_right">
            <router-view></router-view>
          </div>
        </div>
      </ion-content12>
    </ion-content>
    <!--<ion-characteristic class="user_characteristic" title=""></ion-characteristic>-->
    <!--
        作者：846966684@qq.com
        时间：2017-02-21
        描述：通用footer
    -->
    <ion-footer>
    </ion-footer>

  </div>
</template>

<script>
  import store from '../../vuex/store';
  export default {
    name: 'user',
    computed: {
      isPath() {
        let path = this.$route.path;
        let set_path = path.split('/')[2];

        if (set_path === "settings") {
          return '/user/settings/'
        }
        if (set_path === "api") {
          return '/user/api/'
        }
        if (set_path === "policy") {
          return '/user/policy'
        }
/*        if (set_path === "api") {
          return '/user/api/'
        }*/
        return path;
      },
    },
    data() {
      return {
        title: '',
      }
    },
    methods: {
      getUser() {
        lh_http('get', 'user', {}).done(res => {
          if (res.status) {
            ////console.log(res.data)
            this.$store.commit('logon', res.data);
          }
        })
      },
    },
    mounted() {
      this.getUser();
    },
    watch: {
      '$route' (to, from) {
        this.getUser();
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
	.user {
		text-align: left;
		.user_characteristic {
			margin: 20px 0;
		}
		.content {
			/*margin-bottom: 80px;*/
		}
		.box {
			overflow: hidden;
		}
		.content_left,
		.content_right {
			float: left;
			background: #fff;
			margin-bottom: 40px;
		}
		.content_left {
			width: 200px;
			min-height: 992px;
			overflow: hidden;
			.main {
				.ul_content {
					ul {
						margin-top: 26px;
						border-bottom: 1px solid #d7d7d7;
						padding-bottom: 15px;
						margin-bottom: -1px;
						.ul_title {
							margin-top: 26px;
							font-size: 16px;
							margin-left: 23px;
							color: #383a3f;
							margin-bottom: 10px;
							.item_name{
								/*font-weight: bold;*/
							}
							.my_icon {
								font-size: 18px;
								font-style: normal;
								color: #0093F1;
								margin-right: 2px;
							}
						}
						li {
							height: 36px;
							line-height: 36px;
							font-size: 14px;
							a {
								padding-left: 50px;
								color: #727272;
								&.active {
									color: #0093f1;
									font-weight: bold;
								}
							}
							&.active {
								background: #f5f7fa;
							}
						}
					}
				}
				.ul_content:last-child{
					ul{
						border: none;
					}
				}
			}
		}
		.content_right {
			margin-left: 30px;
			width: 970px;
			min-height: 992px;
		}
		.trading_title {
			text-align: left;
			font-size: 14px;
			a {
				color: #9b9b9b;
			}
			.active {
				color: #0093f1;
			}
		}
	}
</style>
