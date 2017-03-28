import Api from '../api/api'

export default { 

	//测试代码
	test(params) {

		var data = {
			URLtype: "test",
			data: params
		}
		return Api.fetch(data);
	} 
}

 
