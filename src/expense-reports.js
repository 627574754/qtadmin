(function(){
	var gl = window.gl;

	//初始化页面
	function initHandle() {
		//底部初始化
		var handle = $('#btmHandle');
		var add = $('#expenseAdd');
		//列表分类搜索操作
		gl.initBottom(handle);
		//添加
		var addDlgHtml = $('#addExpenseDlg').html();
		var addDlg = new gl.Dialog({
			title: 'Add Expense', //窗口标题的html，如果不设置则无标题
			content: addDlgHtml,
			//窗口内容的html，必须是html格式不能是无格式纯文本，如果不设置则无内容
			beforeClose: null, //调用close方法时执行的callback，如果此callback返回false则会阻止窗口的关闭
			showClose: false,
			showFooter: true,
			className: '', //窗口最外层容器的类名
			cache: true, //是否缓存。若为false则close()的时候会remove掉对话框对应的dom元素
			width: '40%' //窗口宽度，如不传递默认为40%
		});
		add.on('click', function() {
			addDlg.open();
		});
	}

	//初始化页面
	initHandle()

})();




