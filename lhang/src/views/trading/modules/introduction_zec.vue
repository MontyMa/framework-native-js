<!--Created by monty.ma on 17/7/4.-->
<template>
  <div class="introduction">
    <div class="intro_tit">
      <div class="img_box v_center">
        <img src="./img/zec_icon.svg"/>
      </div>
      <div class="v_center">Zcash简介</div>
    </div>
    <div class="paragraph">
      <p>
        Zcash（简称ZEC）的前身是Zerocoin项目，它设定了与比特币相同的2100万总量。Zcash早期未进行ICO（Initial Coin Offering），其发行机制沿袭比特币的 POW（Proof of Work）分配方式，但略有变化，具体体现在前四年时间里，矿工挖矿所得的20％Zcash会自动分配给Zcash团队和其投资者，即总量的10%。
      </p>
      <p>
        Zcash的特点之一在于其交易会自动隐藏区块链交易的发送方、收款方以及交易的价值，只有掌握正确查看密钥者，才可以访问这些内容。用户可自行选择哪些人可以拥有这种权限。因此从这一层面上来说，Zcash与其他信息公开化的数字资产差异显著，具有更高的隐蔽性。它的良好隐蔽性源于使用了一个被称为 zk-SNARK算法的零知识证明密码学架构，该架构是由经验丰富的密码学家团队开发的。这个框架允许网络在不公开交易参与方或者交易数额的情况下维护一个安全的账户余额账本。Zcash 交易的元数据是加密的，而不是公开地展示交易参与方和交易数额，zk-SNARK算法 被用来证明没有人进行欺骗或者偷窃。
      </p>
      <p>
        Zcash 总量 2100 万枚，每 4 年减半一次。在第一次减半前的四年时间里，有 20％ 的挖矿收益会分配给 Zcash 团队和其投资人，总数是 210 万枚。第一次减半后，100% 的挖矿收益归矿工所有。
      </p>
      <p>
        Zcash 使用的零知识证明架构的框架允许网络在不公开交易参与方或者交易数额的情况下，维护一个安全的账户余额账本。Zcash 交易的元数据是加密的，而不是公开地展示交易参与方和交易数额，零知识证明被用来证明没有人进行欺骗或者偷窃。
      </p>
    </div>
    <div class="link_box">
      <div class="main_link">官方网站：
        <a class="link" href="https://z.cash/" target="_blank">https://z.cash/</a>
      </div>
      <ul class="link_list">
        <li><a href="http://explorer.zcha.in/" target="_blank">ZEC区块浏览器</a></li>
        <li><a href="https://zcashblog.wordpress.com/zcash-gui-wallets/" target="_blank">ZEC钱包列表</a></li>
        <li><a href="http://www.radarwin.com/file/16-17-Zcash-report.pdf" target="_blank">《2016-2017Zcash报告》</a></li>
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
