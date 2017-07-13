<!--Created by monty.ma on 17/7/4.-->
<template>
  <div class="introduction">
    <div class="intro_tit">
      <div class="img_box v_center">
        <img src="./img/btc_icon.svg"/>
      </div>
      <div class="v_center">比特币简介</div>
    </div>
    <div class="paragraph">
      <p>
        比特币（Bitcoin,简称 BTC）是第一个数字资产品种，最早在2009年由化名为“中本聪”的开发者以开源软件形式推出，是一种点对点网络支付系统和虚拟计价工具，总产量2100万个。它是基于某种特定算法的数字化资产，具有点对点去中心化、世界范围无障碍流通、秘钥专属所有权、交易费用极低、无隐藏成本、跨平台挖掘等优于普通货币的特点。
      </p>
      <p>
        由于其采用密码技术来控制货币的生产和转移，因此比特币也被认为是一种电子加密货币。比特币是经由“挖矿”产生，参与者通过处理交易验证和记录来获取作为手续费的比特币，或获取新产出的比特币。用户可使用个人电脑、移动设备或网络上的电子钱包软件来交易比特币。
      </p>
      <p>
        比特币总量恒定为2100万个，产出以每四年减半的速度下降，最初大约每10分钟可以产生50个比特币报酬，而现在经过几轮减半，比特币网络每十分钟产出12.5个比特币。目前比特币占据了数字资产市场最大份额。
      </p>
      <p>
        比特币不由某特定货币机构发行，它依据特定算法，通过大量计算产生，具有极高的安全性和匿名性。它的底层技术——区块链，近年来备受关注。比特币作为区块链的第一个成功应用，充分展现了一种全新的分布式基础架构与计算范式。
      </p>
    </div>
    <div class="link_box">
      <div class="main_link">官方网站：
        <a class="link" href="https://bitcoin.org/zh_CN/" target="_blank">https://bitcoin.org/zh_CN/</a>
      </div>
      <ul class="link_list">
        <li><a href="https://bitcoin.org" target="_blank">Bitcoin core全节点钱包</a></li>
        <li><a href="https://electrum.org" target="_blank">electrum轻钱包</a></li>
        <li><a href="https://blockchain.info/zh-cn" target="_blank">比特币区块浏览器</a></li>
        <li><a href="http://www.btcqiquan.com/index/Home2/Index/products" target="_blank">比特云云主机</a></li>
        <li><a href="http://www.radarwin.com/file/2016-2017-btc-201702.pdf" target="_blank">《2016-2017年比特币报告》</a></li>
        <li><a href="http://zhibimo.com/read/wang-miao/mastering-bitcoin/" target="_blank">精通比特币</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'introduction',
    data() {
      return {}
    },
    components: {},
    computed: {},
    methods: {},
    beforeMount(){
    },
    mounted() {
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .introduction {
  }
</style>
