<template>
  <div class="team">
    <div class="content_lay">
      <ul>
        <li class="imgbox img4"></li>
        <li class="name">Frank Wei | 产品经理</li>
        <li class="txt">
          比特币长期玩家，多年产品经验<br>
          对区块链和比特币有深厚的研究
        </li>
      </ul>
      <ul>
        <li class="imgbox img3"></li>
        <li class="name">Justin Y.Shi,Ph.D. | 特聘技术顾问</li>
        <li class="txt">
          美国天普大学教授，TCP/IP委员会成员<br>
          主攻高并发处理专业方向，交易所构架与性能提升专家
        </li>
      </ul>
    </div>

    <div class="content_lay">
      <ul>
        <li class="imgbox img5"></li>
        <li class="name">Jody Zhao | 市场经理</li>
        <li class="txt">
          会计专业，7年互联网市场运营与公关经验<br>
          乐于挑战，忠于交易用户体验
        </li>
      </ul>
      <ul>
        <li class="imgbox img6"></li>
        <li class="name">王楠 | 国际法律顾问</li>
        <li class="txt">
          美国Wisconsin法学硕士、博士<br>
          曾供职于纽约、加利福尼亚的全球50强律师事务所
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss" rel="stylesheet/scss">
  .team {
    text-align: left;
    font-size: 0;
    .content_lay {
      display: inline-block;
      vertical-align: middle;
      width: 50%;
      padding: 60px 0 60px 70px;
      box-sizing: border-box;
      ul {
        .imgbox {
          background-repeat: no-repeat;
          background-position: center center;
          width: 81px;
          height: 81px;
        }
        .img3 {
          background-image: url("./img/team_man1.svg");
        }
        .img4 {
          background-image: url("./img/team_man2.svg");
        }
        .img5 {
          background-image: url("./img/team_girl1.svg");
        }
        .img6 {
          background-image: url("./img/team_girl2.svg");
        }
        .name {
          font-size: 14px;
          color: #494949;
          margin-bottom: 6px;
        }
        .txt {
          font-size: 12px;
          color: #797979;
          line-height: 20px;
        }
        &:not(:last-child) {
          margin-bottom: 60px;
        }
      }
    }
  }
</style>
