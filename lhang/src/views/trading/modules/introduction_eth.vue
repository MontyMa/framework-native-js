<!--Created by monty.ma on 17/7/4.-->
<template>
  <div class="introduction">
    <div class="intro_tit">
      <div class="img_box v_center">
        <img src="./img/eth_icon.svg"/>
      </div>
      <div class="v_center">以太坊（ETH）简介</div>
    </div>
    <div class="paragraph">
      <p>
        以太币（Ethereum，简称ETH）是以太坊（Ethereum）的一种数字代币，它的创始人是杰弗里•维尔克（Vitalik Buterin）。开发者们需要支付以太币（ETH）来支撑应用的运行。以太币和其他数字货币一样，可以在交易平台上进行买卖。以太币与比特币之间最大的不同是，比特币的产量每4年减半，而以太币每年的产量则是固定的（可能持续到serenity阶段，即是以太坊发布的第四阶段——权益证明机制(POS））。
      </p>
      <p>
        作为平台和一种编程语言，以太坊使开发人员能够建立和发布下一代分布式应用，以太坊可以用来编程，分散，担保和交易任何事物。简而言之，以太坊是一个开源的区块链底层系统，提供了非常丰富的API和接口，让许多人在上面能够快速开发出各种区块链应用。
      </p>
      <p>
        以太坊有一个很大的特色就是能够实现智能合约。以以太坊区块链为典型代表的智能合约是一套以数字形式定义的承诺、合约参与方可以在上面执行这些承诺的协议。由密码学家Nick Szabo在1994年首次提出以数字形式定义的一系列承诺，包括合约参与方可以在上面执行这些承诺的协议。基于区块链的智能合约包括事务处理和保存的机制，以及一个完备的状态机，用于接受和处理各种智能合约，并且事务的保存和状态处理都在区块链上完成。将智能合约以数字化的形式写入区块链中，由区块链技术的特性保障存储、读取、执行整个过程透明可跟踪、不可篡改。区块链为智能合约提供可信执行环境，智能合约为区块链扩展应用。而在以太坊上的智能合约，能够控制区块链上各种数字资产进行复杂的操作。
      </p>
    </div>
    <div class="link_box">
      <div class="main_link">官方网站：
        <a class="link" href="https://www.ethereum.org/" target="_blank">https://www.ethereum.org/</a>
      </div>
      <ul class="link_list">
        <li><a href="https://etherscan.io/" target="_blank">ETH区块浏览器</a></li>
        <li><a href="https://github.com/ethereum/mist/releases" target="_blank">Mist全节点钱包</a></li>
        <li><a href="https://www.myetherwallet.com" target="_blank">MEW轻钱包</a></li>
        <li><a href="http://ethfans.org/" target="_blank">EthFans</a></li>
        <li><a href="http://www.8btc.com/ethereumwhitepaper" target="_blank">巴比特白皮书</a></li>
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
