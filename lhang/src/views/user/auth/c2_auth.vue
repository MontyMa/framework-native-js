<template>
  <div class="auth" id="info">
    <div class="container">
      <ul class="info_title">
        <li>
          <img class="icon_img" src="./imgs/c2_auth.svg" alt=""/>
        </li>
        <li class="tit_list">
          <p class="tit_tip">您正在为账户进行实名认证(
            <span class="red">*</span>为必须填写)</p>
          <span class="red">*提示认证年龄满18岁，最高年龄限制为60岁</span>
        </li>
      </ul>

      <div class="content_center">
        <div class="auth_info">
          <ul>
            <li>
              <span class="itemtype">姓名</span>
              <p class="inlineblock">{{C2_msg.userName}}</p>
            </li>
            <li>
              <span class="itemtype">出生日期</span>
              <p class="inlineblock">{{C2_msg.birthday}}</p>
            </li>
            <li>
              <span class="itemtype">国家、地区</span>
              <p class="inlineblock">(CHINA)中国大陆</p>
            </li>
            <li>
              <span class="itemtype">证件类型</span>
              <p class="inlineblock">{{C2_msg.type}}</p>
            </li>
            <li>
              <span class="itemtype">证件号码</span>
              <p class="inlineblock">{{getIdcode}}</p>
            </li>
          </ul>
        </div>
        <p class="hint">请填写以下资料可验证
          <span class="blue">C2</span>级别</p>
        <ul class="details">
          <li>
            <span class="title">身份证正面</span>
            <div class="box img_container">
              <div class="file_box">
                <input type="file" multiple="multiple" class="j_img_0" @change="onFileChange"/>
                <div class="change_name" v-if="images.j_img_0===''">
                  <span>+</span>照片
                </div>
                <div class="img_box" :style="{background:'url('+images.j_img_0 +')'}" v-else></div>
              </div>
            </div>
            <span class="title_2">示例</span>
            <div class="box img_container">
              <img src="./imgs/id_1.png" alt=""/>
            </div>
          </li>
          <li>
            <span class="title">身份证背面</span>
            <div class="box img_container">
              <div class="file_box">
                <input type="file" multiple="multiple" class="j_img_1" @change="onFileChange"/>
                <div class="change_name" v-if="images.j_img_1===''">
                  <span>+</span>照片
                </div>
                <div class="img_box" :style="{background:'url('+images.j_img_1 +')'}" v-else></div>
              </div>
            </div>
            <span class="title_2">示例</span>
            <div class="box img_container">
              <img src="./imgs/id_2.png" alt=""/>
            </div>
          </li>
          <li>
            <span class="title">手持身份证</span>
            <div class="box img_container">
              <div class="file_box">
                <input type="file" multiple="multiple" class="j_img_2" @change="onFileChange"/>
                <div class="change_name" v-if="images.j_img_2===''">
                  <span>+</span>照片
                </div>
                <div class="img_box" :style="{background:'url('+images.j_img_2 +')'}" v-else></div>
              </div>
            </div>
            <span class="title_2">示例</span>
            <div class="box img_container">
              <img src="./imgs/id_3.png" alt=""/>
            </div>
          </li>
          <li>
            <span class="title"></span>
            <div class="box requestInfo">
              <p class="red">照片仅用于审核，我们将为您严格保密。</p>
              <p>图片要求：</p>
              <p>1.每张照片小于5M;</p>
              <p>2.图片格式必须是jpg、png、gif其中的一种;</p>
              <p>3.图片必须为本人身份证正面的数码拍摄或扫描照片，请保证身份证上所有信息在图片上是完整并且清晰可见的，请勿上传个人头像等其他图片。</p>
            </div>
          </li>
          <li>
            <span class="title"></span>
            <div class="box">
              <div class="check_box">
                <label>
                  <input type="checkbox" class="g_i_check" v-model="check_box" checked/>
                  <span></span>
                  <span class="g_label sms_msg">我承认提交的信息属于本人所有，不存在盗用他人证件的行为</span>
                </label>
              </div>
              <button type="button" :class="{no_click:!isClick}" @click="runC2Bind">确定绑定</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        check_box: true,
        images: {
          j_img_0: '',
          j_img_1: '',
          j_img_2: ''
        },
        C2_msg: {
          userName: this.$store.getters.getUser.customerInfo.userName,
          type: '身份证',
          code: '--',
          birthday: '--',
          photo_hand: '',
          photo_front: '',
          photo_back: '',
          authType: 'c2',
        }
      }
    },
    computed: {
      getIdcode() {
        return this.C2_msg.code.replace(/^(.{2})(.+)(.{2})$/, '$1****$3')
      },
      isClick() {
        let images = this.images;
        return this.check_box === true && images.j_img_2 !== '' && images.j_img_1 !== '' && images.j_img_0 !== '';
      },
      waitRequest() {
        return this.C2_msg.photo_back === '' || this.C2_msg.photo_front === '' || this.C2_msg.photo_hand === ''
      }
    },
    methods: {
      getIdentify() {
        let identify = sessionStorage.getItem('identify');
        identify = JSON.parse(identify);

        if (!identify) return;

        [
          this.C2_msg.type,
          this.C2_msg.code,
          this.C2_msg.birthday
        ] = [
          identify.credentialsType,
          identify.credentialsCode,
          window.format(identify.birthDay, 'yyyy-MM-dd')
        ];
      },

      onFileChange(event) {
        let className = event.target.className;
        let files = event.target.files[0] || event.dataTransfer.files[0];

        if (!className) return;

        let fileReader = new window.FileReader();
        fileReader.readAsDataURL(files);

        fileReader.onload = (e) => {
          this.images[className] = e.target.result
        };
        this.uploadImg(files, className)
      },

      uploadImg(file, classname) {
        let url = 'fileUpload/loadFile';
        let formData = new FormData();

        let config_api = config.api;

        let getFileType = {
          j_img_0: 'F',
          j_img_1: 'B',
          j_img_2: 'H'
        };

        let file_type = getFileType[classname];

        formData.append('file', file);
        formData.append('fileType', file_type);
        //        formData.append('useruuid', this.$store.getters.getUser.customerInfo.uuid);

        let C2_msg = this.C2_msg;

        $.ajax({
          url: config_api + url,
          type: 'POST',
          dataType: 'json',
          contentType: false,
          cache: true,
          processData: false,
          data: formData
        }).done(res => {
          if (!res.success) {
            alert(res.msg);
            if (classname === 'j_img_0') {
              C2_msg.photo_front = '';
            } else if (classname === 'j_img_1') {
              C2_msg.photo_back = '';
            } else {
              C2_msg.photo_hand = '';
            }
            return
          }

          let data = res.dataWrapper;

          if (classname === 'j_img_0') {
            C2_msg.photo_front = data.filePathName;
          } else if (classname === 'j_img_1') {
            C2_msg.photo_back = data.filePathName;
          } else {
            C2_msg.photo_hand = data.filePathName;
          }
        });
      },
      runC2Bind() {
        let url = 'account/identify';
        if (!this.isClick) {
          alert('请上传图片');
          return
        }
        let nickname = this.$store.getters.getUser.customerInfo.nickname;
        if (nickname) {
          this.C2_msg.nickname = nickname;
        }

        if (this.waitRequest) return;

        lh_http('post', url, this.C2_msg).done(res => {
          if (!res.status) {
            alert(res.data);
            return
          }
          alert('提交成功');
          location.hash = '/user/auth';
          location.reload();
        })
      }
    },
    beforeMount() {
      this.getIdentify();
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .auth {
    text-align: left;
    font-size: 14px;
    .blue {
      color: #0093F1;
    }
    color: #494949;
    .container {
      /*margin-top: 50px;*/
      border: 1px solid #efefef;
      padding: 50px 0;
      text-align: center;
      .content_center {
        display: inline-block;
        margin-left: -80px;
      }
      .red {
        color: #ff6464;
        font-size: 12px;
      }
      .info_title {
        margin-left: 47px;
        margin-bottom: 33px;
        text-align: left;
        overflow: hidden;
        .tit_tip {
          font-size: 16px;
          color: #494949;
        }
        .icon_img {
          width: 60px;
          height: 60px;
          margin-right: 27px;
        }
        li {
          display: inline-block;
          vertical-align: middle;
        }
      }
      .auth_info {
        margin-top: 30px;
        margin-left: 110px;
        font-size: 14px;
        text-align: left;
        .auth_info_title {
          margin-bottom: 20px;
          padding-top: 30px;
        }
        li {
          margin-bottom: 15px;
          .itemtype {
            display: inline-block;
            width: 80px;
            text-align: right;
            margin-right: 20px;
            color: #999;
          }
          .inlineblock {
            display: inline-block;
          }
          .blue {
            color: #0093F1;
          }
        }
      }
      .hint {
        text-align: left;
        margin: 36px 0 30px 110px;
      }
      .details {
        margin-left: 75px;
        li {
          margin-bottom: 30px;
          margin-left: 35px;
          .requestInfo {
            p {
              line-height: 20px;
              font-size: 12px;
            }
          }
          .title {
            display: inline-block;
            width: 80px;
            text-align: right;
            margin-right: 22px;
          }
          .title_2 {
            display: inline-block;
            margin-right: 20px;
          }
          .st_span {
            display: inline-block;
            width: 90px;
            text-align: right;
            margin-right: 50px;
          }
          .box {
            width: 412px;
            display: inline-block;
            text-align: left;
            position: relative;
            margin-right: 10px;
            &.img_container {
              width: 200px;
              vertical-align: middle;
            }
            .file_box {
              width: 160px;
              height: 120px;
              position: relative;
              .img_box {
                width: 100%;
                height: 100%;
                position: absolute;
                background-repeat: no-repeat !important;
                background-size: contain !important;
                background-position: 50% 50% !important;
                top: 0;
                left: 0;
              }
              input[type='file'] {
                width: 100%;
                height: 100%;
                opacity: 0;
                position: relative;
                z-index: 10;
                cursor: pointer;
              }
              .change_name {
                position: absolute;
                background: #f3f3f3;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                font-size: 24px;
                line-height: 120px;
                text-align: center;
                color: #999;
                span {
                  font-size: 120%;
                }
              }
            }
            .check_box {
              position: absolute;
              font-size: 14px;
            }
            .sms_msg {
              span {
                width: initial;
                color: #f35809;
              }
            }
            .codeIcon {
              position: absolute;
              top: 2px;
              right: 10px;
              width: 100px;
              height: 40px;
              background: #ccc;
            }
            input[type="text"] {
              width: 412px;
              padding: 0 15px;
              height: 45px;
              border: 1px solid #9b9b9b;
              border-radius: 3px;
            }
            button {
              width: 412px;
              height: 45px;
              line-height: 45px;
              background: #0093F1;
              margin-top: 30px;
              color: #fff;
              text-align: center;
              cursor: pointer;
              &:hover {
                background: darken(#0093F1, 10%);
              }
              &.no_click {
                background: #78cbfa;
                color: #bbe2fd;
              }
            }
          }
        }
      }
    }
  }
</style>
