(function(){
	var gl = window.gl;

	//tab切换
	function tabSwitch() {
		var tabs = $('.navTab');
		var cnts = $('.tabCnt');
		tabs.on('click',function() {
			var index = $(this).index();
			tabs.removeClass('cur');
			cnts.addClass('none').eq(index).removeClass('none');
			$(this).addClass('cur');
		});
	}

	//初始化页面
	function initHandle() {
		var del = $('#btnDel');

		//删除
		var delDlg = new gl.Dialog({
			title: '删除', //窗口标题的html，如果不设置则无标题
			content: '<div class="ui-dialog-bd"><p>删除当前旅游？</p></div>',
			//窗口内容的html，必须是html格式不能是无格式纯文本，如果不设置则无内容
			beforeClose: null, //调用close方法时执行的callback，如果此callback返回false则会阻止窗口的关闭
			showClose: false,
			showFooter: true,
			className: '', //窗口最外层容器的类名
			cache: true, //是否缓存。若为false则close()的时候会remove掉对话框对应的dom元素
			width: '25%' //窗口宽度，如不传递默认为40%
		});
		del.on('click', function() {
			delDlg.open();
		});
	}
	

	//初始化tab切换
	tabSwitch();
	//初始化页面
	initHandle()

})();




