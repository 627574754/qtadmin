(function(){
	var gl = window.gl;

	//初始化页面
	function initHandle() {
		//底部初始化
		var handle = $('#btmHandle');
		var group = $('#btmGroup');
		//列表分类搜索操作
		gl.initBottom(handle);
		gl.initBottom(group);
	}
	

	
	//初始化页面
	initHandle()
})();




