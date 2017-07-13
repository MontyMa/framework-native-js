<template>
  <div class="alternately">
    <trade-button :val="butParams" :width="65" @buttonIndex="getBtnIndex"></trade-button>
    <div class="alternately_cont">
      <plate-main :plateIndex="plateIndex"></plate-main>
    </div>
  </div>
</template>
<script>
  import tradeButton from './trade_button.vue'; //切换按钮
  import plateMain from './plate_main.vue'; //主板
  export default {
    name: 'alternately',
    data(){
      return {
        butParams: ['主板', '创新板'],
        plateIndex: 0,
      }
    },
    components: {tradeButton, plateMain},
    methods: {
      getBtnIndex(index){
        this.plateIndex = index;
      }
    },
    computed: {},
    mounted() {
    },
  };
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .alternately {
    width: 360px;
    height: 495px;
    position: absolute;
    top: 0;
    right: 0;
    text-align: left;
    .alternately_cont {
      height: 464px;
      border: 1px solid #6F8EA1;
      -webkit-transform: translateY(-1px);
      -moz-transform: translateY(-1px);
      -ms-transform: translateY(-1px);
      -o-transform: translateY(-1px);
      transform: translateY(-1px);
    }
  }
</style>
