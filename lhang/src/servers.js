window.config = {
  //  			api: 'https://lhang.com/', //测试地址
  // api: 'localhost' == window.location.hostname ? 'http://lhang.radarwin.com/' : '/', //测试地址
    api: 'localhost' == window.location.hostname ? 'http://172.16.5.218:8091/' : '/', //测试地址
  //      api: 'http://172.16.5.52:8080/',    //彭聪

  //		api: 'http://172.16.1.92:8081/', //测试
  //   api: 'http://172.16.5.164:8081/',//王导群地址
  //		source: '2', 																									//h5 请求必带的一个状态
  //		socket_host: 'wss://mobile.lhang.com/ws/transport', 							//lhang socket 地址
  //		socket_host: 'ws://172.16.1.69:8080/exchange-mobile/transport',		//69 socket 地址
  //		socket_host: 'ws://172.16.1.93/ws/transport',											//93 socket 地址
  // socket_host: 'localhost' == window.location.hostname ? 'ws://lhang.radarwin.com/ws/transport' : window.location.protocol == 'http:' ? 'ws://' + window.location.host + '/ws/transport' : 'wss://' + window.location.host + '/ws/transport', //93 socket 地址
  socket_host: 'localhost' == window.location.hostname ? 'ws://172.16.5.218:8091/ws/transport' : window.location.protocol == 'http:' ? 'ws://' + window.location.host + '/ws/transport' : 'wss://' + window.location.host + '/ws/transport', //93 socket 地址
  //		socket_host: 'ws://172.16.5.203:8081/sockjs/transport',						//小彭 socket 地址
  //  			socket_host: 'wss://lhang.com/ws/transport', //93 socket 地址
};
