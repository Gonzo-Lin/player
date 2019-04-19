exports.install = function (Vue, options) {


	// 格式化文字加载中
	Vue.filter('text_loading',(value)=>{
		if(!value) return 'Loading...';
  		return value;
	})

	
	// 格式化歌曲时间
	Vue.filter('_format_song_time',(value)=>{
		if (!value) return '0:00';
		var _minues = parseInt(value / 60),
		_second = parseInt(value % 60 );
		return `${_minues}:${_second < 10 ? '0'+_second : _second}`
	})

	// 格式化数字
	Vue.filter('_format_count',(value)=>{
		if (!value) return '0';
		
		let countLength = parseFloat((value + "").replace(/[^\d\.-]/g, "")).toFixed(0).length;
		if(countLength < 5 ) return value;
		var count,cutstr;
		if(countLength < 9 ){
			cutstr = (value/10000).toFixed(2) ;
			count = cutstr + ' 万';
		}else{
			cutstr = (value/100000000).toFixed(2) ;
			count = cutstr + ' 亿';
		}




		return count;
	})

	
}
