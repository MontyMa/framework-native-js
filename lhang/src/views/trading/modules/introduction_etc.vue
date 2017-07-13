<!--Created by monty.ma on 17/7/4.-->
<template>
  <div class="introduction">
    <div class="intro_tit">
      <div class="img_box v_center">
        <img src="./img/etc_icon.svg"/>
      </div>
      <div class="v_center">以太经典（ETC）简介</div>
    </div>
    <div class="paragraph">
      <p>
        以太经典（EthereumClassic，简称ETC）是以太坊在1,920,000个块后硬分叉出的分叉币种，功能和以太坊极为类似。它保留了原有以太坊的代码规则和特色，秉承去中心化理念，通过区块链保证共识机制。
      </p>
      <p>
        以太坊在全球最大众筹The DAO资金被盗事件之后，为了能向更好的方向发展，不得不进行硬分叉。而在以太坊区块链硬分叉之后，出现了原有以太坊网络与新的网络并存的状况。一群坚持区块链核心价值的开发者组成了Ethereum Classic，发行独立的加密货币，由此出现了一个新币种，即以太经典（ETC）。此后，以太坊便分裂成为ETH和ETC两大阵容。
      </p>
      <p>
        自分叉以后，ETH和ETC的货币政策也走向了不同的道路，ETH目前没有上限，处于持续增发阶段。而ETC已经回归了奥地利经济学派的传统，按照比特币的方式进行了了减产的规划，最后总量不会超过2.1亿个。
      </p>
      <p>
        另外，以太经典基于POW机制也是较于以太坊有更大的优势。数字货币的核心是共识机制，POW基于工作量证明的机制目前已经被市场证明是最优秀的制度，数字货币总市值排名前十位有八位是基于POW机制。
      </p>
    </div>
    <div class="link_box">
      <div class="main_link">官方网站：
        <a class="link" href="http://www.ethereumclassic.org" target="_blank">http://www.ethereumclassic.org</a>
      </div>
      <ul class="link_list">
        <li><a href="https://bitcointalk.org/index.php?topic=1559630.0" target="_blank">官方论坛</a></li>
        <li><a href="https://github.com/ethereumproject/mist/releases" target="_blank">Mist全节点钱包</a></li>
        <li><a href="https://www.myetherwallet.com" target="_blank">MEW轻钱包</a></li>
        <li><a href="http://explorer.ethereumclassic.com/" target="_blank">区块链查询</a></li>
        <li><a href="https://ethereumclassic.herokuapp.com" target="_blank">Slack讨论组</a></li>
        <li><a href="http://www.radarwin.com/file/ethereum-2016-2017.pdf" target="_blank">《2016-2017以太坊报告》</a></li>
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
