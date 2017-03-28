import 'isomorphic-fetch'
import ApiURL from './url' 
 
 
export default  { 
	 
	//封装ajax
	fetch(data) { 

		if (!data) {
			return;
		} 

		let url = this.getUrlByType(data),Pars=data.data;
         
        //参数
        if (Pars) {
        	for(var key in Pars){
        		if (url.substr(url.indexOf("?")).indexOf(key)<0) {
        			url+="&"+key+"="+Pars[key];
        		}
        	}
        }

        return fetch(url).then(response => response.json() ).then(
	      response => ({response}),
	      error => ({error: error })
    	)  
	}, 

	//post
	post(data){ 
		 
	},

	//delete
	delete(data){ 
		 
	},
	//put
	put(data){
		 
	},

	//构建url
	getUrlByType: function(data) {

		//存在不用构建
		if (data.url ) {
			return data.url ;
		} 

		let url;

		//是否调试
		if (ApiURL.Settings.debug) {
			url = ApiURL.DEBUGURL[data.URLtype];
		} else {
			url = ApiURL.Settings.hostname + ApiURL.URL[data.URLtype];
		} 

		//没有调试接口
		if (!url) {
			alert(data.URLtype + " 未定义");
		}

		//url 是否有参数
		var urlPars = url.match(/\{([\s\S]+?(\}?)+)\}/g);

		var temp = data.data || {};

		if ((typeof temp) == 'string') {
			temp = JSON.parse(temp);
		}   

		if (urlPars) {
			for (var i = 0; i < urlPars.length; i++) {

				var rex = urlPars[i],
					par = rex.replace(/[{|}]/g, ""),
					val = temp[par];
				url = url.replace(rex, val);
			}
		} 

		//请求 时间戳
		if (url.indexOf("?") > -1) {
			url += "&t=" + (+new Date);
		} else {
			url += '?t=' + (+new Date);
		} 

		return url;
	} 

}


 