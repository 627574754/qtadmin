(function(){
	var gl = window.gl;

	//初始化页面
	function initHandle() {
		//底部初始化
		var handle = $('#btmHandle');
		//列表分类搜索操作
		gl.initBottom(handle);
	}
	//初始化页面
	initHandle()
	//初始化选择框
	gl.initCheckBox();
})();




