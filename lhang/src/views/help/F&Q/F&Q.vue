<template>
  <div class="problem_area">
    <div class="sarch">
      <input class="sarch_input" type="text" placeholder="请输入您的问题">
      <div class="submit">
        <!--垂直居中-->
        <div class="v_middle"></div>
        <img src="./img/sarch.png">
      </div>
      <p class="sar_tip">找不到您的问题答案？<a href="javascript:void (0)">点我立即联系</a>人工客服吧~</p>
    </div>
    <!--快捷跳转-->
    <shortcut-list></shortcut-list>
    <!--搜索结果, todo 当搜索有结果时应做判断使快捷跳转组件消失-->
    <sarch-result></sarch-result>
  </div>
</template>
<style lang="scss" rel="stylesheet/scss">
  .problem_area {
    text-align: left;
    .sarch {
      position: relative;
      .sarch_input {
        width: 100%;
        border: 1px solid #9B9B9B;
        padding: 20px;
        font-size: 16px;
        line-height: 23px;
      }
      .submit {
        position: absolute;
        right: 1px;
        top: 1px;
        width: 63px;
        height: 63px;
        background-color: #0093F1;
        cursor: pointer;
        text-align: center;
        font-size: 0;
        .v_middle, img {
          display: inline-block;
          vertical-align: middle;
        }
        .v_middle {
          height: 100%;
        }
      }
      .sar_tip {
        text-align: right;
        font-size: 12px;
        color: #666666;
        line-height: 35px;
        a {
          color: #0093F1;
        }
      }
    }
  }
</style>

<script>
  import shortcutList from '../pannel/shortcut_list.vue';
  import sarchResult from '../pannel/sarch_result.vue';

  export default{
    name: 'problem',
    components: {
      shortcutList,   //搜索下的快捷方式
      sarchResult,    //搜索结果
    }
  }
</script>


