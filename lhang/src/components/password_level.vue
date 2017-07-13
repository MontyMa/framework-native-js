<template>
  <div class="password_level" :class="levels_class" v-if="lengths!==0">
    <div v-if="tip_status" class="error_tip">您输入不少于7位的数字和字母组成组合的密码</div>
    <div v-else>
      <ul class="icon lay">
        <li class="level bg"></li>
        <li class="level" :class="{bg:this.lengths > 8}"></li>
        <li class="level" :class="{bg:this.lengths > 12}"></li>
      </ul>
      <div class="tip lay">安全系数<span class="levels_txt">{{levels}}</span></div>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'password_level',
    data(){
      return {
        lengths: 0,
        levels_class: '',
        levels: '--',
      }
    },
    props: ['password', 'tip_status'],
    computed: {},
    methods: {
      getStatus(val){
        this.lengths = val.length;

        if (this.lengths > 8 && this.lengths <= 12) {
          this.levels = '中';
          this.levels_class = 'middle';
        } else if (this.lengths > 12) {
          this.levels = '高';
          this.levels_class = 'high';
        } else {
          this.levels = '低';
          this.levels_class = '';
        }
      }
    },
    watch: {
      password(val){
        this.getStatus(val);
      }
    },
  }
</script>
<!--包含此组件的外套必须要添加 position:relative-->
<style lang="scss" rel="stylesheet/scss" scoped>
  .password_level {
    position: absolute;
    bottom: -10px;
    left: 0;
    line-height: normal;
    font-size: 0;
    width: 412px;
    .error_tip {
      font-size: 12px;
      color: #FF4FA1;
    }
    .lay {
      display: inline-block;
      vertical-align: middle;
      font-size: 12px;
      transition: 300ms;
    }
    .icon {
      width: 70%;
      text-align: left;
    }
    .tip {
      width: 30%;
      text-align: right;
    }
    .level {
      width: 80px;
      height: 12px;
      border: 1px solid transparent;
      display: inline-block;
      vertical-align: middle;
      &:not(:first-child) {
        margin-left: 3px;
      }
    }

    .level {
      border-color: #FF4FA1;
      &.bg {
        background: #FF4FA1;
      }
    }
    .tip {
      color: #FF4FA1;
    }
    &.middle {
      .level {
        border-color: #29E2B9;
        &.bg {
          background: #29E2B9;
        }
      }
      .tip {
        color: #29E2B9;
      }
    }
    &.high {
      .level {
        border-color: #00BB91;
        &.bg {
          background: #00BB91;
        }
      }
      .tip {
        color: #00BB91;
      }
    }
    .levels_txt {
      margin-left: 10px;
    }
  }
</style>
