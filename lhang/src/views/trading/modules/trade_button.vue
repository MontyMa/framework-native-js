<!--Created by monty.ma on 17/6/29.-->
<template>
  <ul class="trade_button" :class="{radius_bottom:bottom}">
    <template v-for="(item,i) in val">
      <li class="btn g_t_btn"
          :style='{width:`${width}px`}'
          :class="{active:currentIndex===i,pointer:isPointer}"
          @click="getBtnIndex(i)">
        {{item}}
      </li>
    </template>
  </ul>
</template>
<script>
  export default {
    name: 'trade_button',
    data() {
      return {
        currentIndex: 0, //当前的
      }
    },
    props: {
      val: {type: Array, required: true},
      width: {type: Number},
      bottom: {type: Boolean},
      isPointer: {type: Boolean, default: true}
    },
    components: {},
    computed: {},
    methods: {
      getBtnIndex(index){
        this.currentIndex = index;
        this.$emit('buttonIndex', index);
      }
    },
    beforeMount(){
    },
    mounted() {
//      this.$emit('buttonIndex', 0);
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .trade_button {
    font-size: 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    &.radius_bottom {
      .btn {
        &:first-child {
          -moz-border-radius-bottomleft: 6px;
          border-bottom-left-radius: 6px;
        }
        &:last-child {
          -moz-border-radius-bottomright: 6px;
          border-bottom-right-radius: 6px;
        }
      }
    }
    .btn {
      font-size: 14px;
      line-height: 30px;
      font-weight: 600;
      text-align: center;
      display: inline-block;
      vertical-align: middle;
      border: 1px solid #6F8EA1;
      &.pointer {
        cursor: pointer;
      }
      &:first-child {
        -moz-border-radius-topleft: 6px;
        border-top-left-radius: 6px;
      }
      &:last-child {
        -moz-border-radius-topright: 6px;
        border-top-right-radius: 6px;
      }
      &:not(:last-child) {
        border-right: none;
      }
    }
  }
</style>
