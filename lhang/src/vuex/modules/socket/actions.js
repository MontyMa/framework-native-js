export const send = ({commit}, p) => {
  if (!window.socket) {
    try {
      var host = window.config.socket_host;
      console.log(host);
      window.socket = new Reconnecting(host);
      window.socket.onmessage = (event) => {
        if (event.data) {
          var data = JSON.parse(event.data);
          if (data.data) {
            commit(data.channel + '', data);
          }
        }
      };
    } catch (exception) {
    }
  }

  // 维护心跳
  setInterval(function () {
    if (window.socket.readyState === 1) {
      window.socket.send("1");
    }
  }, 3000);
  /////////////////////////////
  if (!window.channels[JSON.stringify(p)] || p.isClose) {
    window.channels[JSON.stringify(p)] = {
      channel: JSON.stringify(p),
      status: 0,
      p: p
    };

    if (p.isClose) {
      let bak = {};
      $.extend(bak, p);
      delete bak['isClose'];
      delete channels[JSON.stringify(bak).replace(/[\\]/g, '')];
    }
  }
  setInterval(function () {
    let channel = findChannels();
    if (channel) {
      if (window.socket.readyState === 1) {
        window.channels[channel].status = 1;
        window.socket.send(JSON.stringify(channels[channel].p));
      }
    }
  }, 100);

  function findChannels() {
    for (var Key in window.channels) {
      let status = window.channels[Key].status;
      if (status === 0) return Key
    }
  }
};
