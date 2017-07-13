window.alert = function (str, tag) {
  let dtd = $.Deferred();
  if (document.getElementById("bgDiv") == undefined) {
    let msgw, msgh, titleheight, bordercolor, titlecolor;

    msgw = 300;
    //提示窗口的宽度
    msgh = 159;
    //提示窗口的高度
    titleheight = 0; //提示窗口标题高度
    bordercolor = "#ebebeb";
    //提示窗口的边框颜色
    titlecolor = "#fff";
    //提示窗口的标题颜色

    let sWidth, sHeight;
    sWidth = screen.width;
    sHeight = screen.height;

    let bgObj = document.createElement("div");
    bgObj.setAttribute('id', 'bgDiv');
    bgObj.style.position = "fixed";
    bgObj.style.top = "0";
    bgObj.style.background = "#000";
    bgObj.style.filter = "progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity=75";
    bgObj.style.opacity = "0.6";
    bgObj.style.left = "0";
    bgObj.style.width = "100%";
    bgObj.style.height = "100%";
    bgObj.style.zIndex = "100000000000000";
    document.body.appendChild(bgObj);

    let msgObj = document.createElement("div");
    msgObj.setAttribute("id", "msgDiv");
    msgObj.setAttribute("align", "center");
    msgObj.style.background = "#fff";
    msgObj.style.border = "1px solid " + bordercolor;
    msgObj.style.position = "fixed";
    msgObj.style.left = "50%";
    msgObj.style.top = "50%";
    msgObj.style.font = "16px/1.6em 微软雅黑, Geneva, Arial, Helvetica, sans-serif";
    msgObj.style.marginLeft = "-151px";
    msgObj.style.marginTop = "-70px";
    msgObj.style.width = msgw + "px";
    msgObj.style.height = msgh + "px";
    msgObj.style.textAlign = "center";
    msgObj.style.lineHeight = "25px";
    msgObj.style.borderRadius = "8px";
    msgObj.style.zIndex = "100000000000001";

    let title1 = document.createElement("h2");
    title1.setAttribute("id", "msgTitle1");
    title1.setAttribute("align", "center");
    title1.setAttribute("line-height", "20px");
    // title1.style.margin = "-10px 0 0 0";
    title1.style.padding = "0px";
    title1.style.background = titlecolor;
    title1.style.border = "0";
    title1.style.font = "20px Verdana, Geneva, Arial, Helvetica, sans-serif";
    title1.style.color = "#0093F1";
    title1.style.cursor = "pointer";
    title1.innerHTML = "提示";

    if (tag) {
      let btn1 = document.createElement("button");
      btn1.setAttribute("id", "btnTitle");
      btn1.setAttribute("line-height", "20px");
      btn1.style.width = "80px";
      btn1.style.height = "30px";
      btn1.style.background = '#44b549';
      btn1.style.position = "absolute";
      btn1.style.left = "170px";
      btn1.style.bottom = "10px";
      btn1.style.border = "0";
      btn1.style.font = "16px Verdana, Geneva, Arial, Helvetica, sans-serif";
      btn1.style.color = "#fff";
      btn1.style.cursor = "pointer";
      btn1.style.borderRadius = "4px";
      btn1.innerHTML = "确定";
      btn1.onclick = function () {
        dtd.resolve('ok');
        document.body.removeChild(bgObj);
        document.getElementById("msgDiv").removeChild(title);
        document.body.removeChild(msgObj);
      };

      let btn2 = document.createElement("button");
      btn2.setAttribute("id", "btnTitle");
      btn2.setAttribute("line-height", "20px");
      btn2.style.width = "80px";
      btn2.style.height = "30px";
      btn2.style.background = '#b2b3b4';
      btn2.style.position = "absolute";
      btn2.style.right = "170px";
      btn2.style.bottom = "10px";
      btn2.style.border = "0";
      btn2.style.font = "16px Verdana, Geneva, Arial, Helvetica, sans-serif";
      btn2.style.color = "#fff";
      btn2.style.borderRadius = "4px";
      btn2.style.cursor = "pointer";
      btn2.innerHTML = "取消";
      btn2.onclick = function () {
        document.body.removeChild(bgObj);
        document.getElementById("msgDiv").removeChild(title);
        document.body.removeChild(msgObj);
      };
    }
    let title = document.createElement("h4");
    title.setAttribute("id", "msgTitle");
    title.setAttribute("align", "right");
    title.innerHTML = '&#xe656;';
    title.style.margin = "0px 0 0 0";
    title.style.padding = "0 20px";
    // title.style.background = "url('../static/imgs/p_alert_close.png') no-repeat 30px center";
    title.style.filter = "progid:DXImageTransform.Microsoft.Alpha(startX=20, startY=20, finishX=100, finishY=100,style=1,opacity=75,finishOpacity=100);";
    title.style.opacity = "0.75";
    title.style.border = "0";
    title.style.width = "55px";
    title.style.height = "30px";
    title.style.position = "relative";
    title.style.left = "245px";
    title.style.top = "-5px";
    // title.style.font = "24px Verdana, Geneva, Arial, Helvetica, sans-serif";
    title.style.color = "#999999";
    title.style.cursor = "pointer";
    title.onclick = function () {
      document.body.removeChild(bgObj);
      document.getElementById("msgDiv").removeChild(title);
      document.body.removeChild(msgObj);
    };
    document.body.appendChild(msgObj);
    document.getElementById("msgDiv").appendChild(title);
    document.getElementById("msgDiv").appendChild(title1);
    if (tag) {
      document.getElementById("msgDiv").appendChild(btn1);
      document.getElementById("msgDiv").appendChild(btn2);
    }
    let txt = document.createElement("p");
    txt.style.margin = "10px 0";
    txt.setAttribute("id", "msgTxt");
    txt.style.color = "#494949";
    title.style.margin = "15px 0 0 0";
    txt.style.font = "18px Verdana, Geneva, Arial, Helvetica, sans-serif";
    txt.innerHTML = str;
    document.getElementById("msgDiv").appendChild(txt);

    if (tag) {

    } else {
      //0.5秒自动消失
      setTimeout(function () {
        try {
          document.body.removeChild(bgObj);
          document.getElementById("msgDiv").removeChild(title);
          document.body.removeChild(msgObj);
        } catch (e) {
          //TODO handle the exception
        }
        dtd.resolve('ok');
      }, 1500);
    }

  } else {
    try {
      document.body.removeChild(bgObj);
      document.getElementById("msgDiv").removeChild(title);
      document.body.removeChild(msgObj);
    } catch (e) {
      //TODO handle the exception
    }
  }
  return dtd.promise();
};
