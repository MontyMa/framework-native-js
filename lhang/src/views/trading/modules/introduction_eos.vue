<!--Created by monty.ma on 17/7/4.-->
<template>
  <div class="introduction">
    <div class="intro_tit">
      <div class="img_box v_center">
        <img src="./img/zec_icon.svg"/>
      </div>
      <div class="v_center">EOS简介</div>
    </div>
    <div class="paragraph">
      <p>
        EOS是一款区块链操作系统，可以支持多个应用程序同时运行。作为底层区块链操作系统，EOS能够降低开发难度，简化了区块链应用程序的开发难度。EOS区块链系统可支持绝大多数商业应用场景。
      </p>
      <p>
        EOS可以被认为是一个电子邮件系统，每个用户和机器人都在这个邮件系统里有一个邮件地址。若消息投递成功意味接收方接收到消息并根据智能合约触发相应处理，但EOS里的收件人和被抄送人有能力拒收消息，这将导致传递失败。EOS的区块链是一个透明和永久的消息记录系统，记录了EOS系统内部所有传递成功的消息。
      </p>
      <p>
        与其他平台不同，EOS上的应用程序不需要用户为区块链上的操作支付费用。像传统的基于Web的应用程序一样，EOS应用程序开发人员提供程序运行需要的资源，而不是由用户提供。这些资源包括带宽、计算力、存储容量等。这意味着我们可以创建免费的区块链应用程序，新用户无需经历繁琐的加密数字货币购买流程，就可直接使用区块链上的应用程序。
      </p>
      <p>
        EOS使得大规模分布式应用程序得以相互通信，这是在之前底层区块链平台上不可能实现的。构建在EOS的分布式应用程序，不光用户可以相互交流，而且这些分布式应用程序还可以给彼此提供区块链的相关服务。
      </p>
      <p>
        分布式应用程序得以相互通信，这是在之前底层区块链平台上不可能实现的。构建在EOS的分布式应用程序，不光用户可以相互交流，而且这些分布式应用程序还可以给彼此提供区块链的相关服务。
      </p>
    </div>
    <div class="link_box">
      <div class="main_link">官方网站：
        <a class="link" href="https://z.cash/" target="_blank">https://eos.io/</a>
      </div>
      <ul class="link_list">
        <li>
          <a href="https://github.com/EOSIO/Documentation/blob/master/zh-CN/TechnicalWhitePaper.md" target="_blank">技术白皮书中文版</a>
        </li>
        <li>
          <a href="Github.com/eosio/documentation/blob/master/technicalwhitepaper.md#background" target="_blank">技术白皮书英文版：</a>
        </li>
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
