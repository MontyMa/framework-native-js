const option = {
	tooltip: {
		trigger: 'axis',
		formatter: function(params) {
			if(!params[0].data){
				return
			}
			if(params[1].dataIndex == 0){
				return '委托价：' + params[0].data.value[0] + '<br/>' + '委托量：' + params[0].data.value[1];
			}else{
				return '委托价：' + params[1].data.value[0] + '<br/>' + '委托量：' + params[1].data.value[1];
			}
		}
	},
	color: ['#ef232a', '#14b143'],
	grid: {
		left: '6%',
		// right: '1%',
    width:'93%',
    height:'70%',
		top: '20%'
	},
	xAxis: {
		type: 'value',
		min: 0,
    	max: 0,
	},
	yAxis: {
		type: 'value',
	},
	series: [{
		name: '买单',
		type: 'line',
    	showSymbol: false,
		data: [
			{
				value: [],
			}
		],
		areaStyle: {
			normal: {
				color: '#ef232a',
				opacity: 0.3
			}
		},
	}, {
		name: '卖单',
		type: 'line',
    	showSymbol: false,
		data: [
			{
				value: [],
			}
		],
		areaStyle: {
			normal: {
				color: '#14b143',
				opacity: 0.3
			}
		},
	}]
}

const depth = {
	get_option: option,
	get_data: function(val) {
		let y = [];
		let l = 0;
		let minx = 0;
		var bids = val.bids
		for(var i of bids) {
			l = l + i[1];
			minx =  i[0] < minx || minx == 0 ? i[0] : minx;
			y.push({
				value: [i[0],l.toFixed(4)]
			});
		}
		option.xAxis.min = minx;
		let y1 = [];
		let l1 = 0;
		let maxx = 0;
		for(var i of val.asks) {
			l1 = l1 + i[1];
			maxx =  i[0] > maxx || maxx == 0 ? i[0] : minx;
			y1.push({
				value: [i[0],l1.toFixed(4)]
			});
		}
		option.xAxis.max = maxx;
		option.series[1].data = [];
		option.series[0].data = y.reverse();
		option.series[1].data = y1;
		return option;
	}
}

export default depth;
